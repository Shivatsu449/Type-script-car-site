import type { WikimediaImage } from '../types'

const COMMONS = 'https://commons.wikimedia.org/w/api.php'
const WIKIPEDIA = 'https://en.wikipedia.org/w/api.php'
const PHOTO_CACHE_PREFIX = 'noir-machines:photo:v4:'

export type WikiSummary = {
  title: string
  extract: string
  pageUrl?: string
}

type WikiArticle = {
  title: string
  pageUrl?: string
  cover?: WikimediaImage
}

const articleMemory = new Map<string, WikiArticle | null>()
const galleryMemory = new Map<string, WikimediaImage[]>()
const coverMemory = new Map<string, WikimediaImage | null>()

type QueueItem = { run: () => Promise<void> }
const coverQueue: QueueItem[] = []
let coverQueueActive = 0
const MAX_CONCURRENT_COVER_REQUESTS = 2
const COVER_REQUEST_GAP_MS = 320

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

async function fetchJsonWithRetry(url: URL, attempts = 3): Promise<any> {
  let lastError: unknown = null

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return await response.json()

      if (response.status === 429 && attempt < attempts - 1) {
        const retryAfter = Number(response.headers.get('Retry-After') ?? 0)
        const wait = retryAfter > 0 ? retryAfter * 1000 : 1000 * (attempt + 1)
        await sleep(wait)
        continue
      }

      throw new Error(`HTTP ${response.status}`)
    } catch (error) {
      lastError = error
      if (attempt < attempts - 1) await sleep(500 * (attempt + 1))
    }
  }

  throw lastError ?? new Error('Network request failed')
}

function scheduleCoverRequest<T>(work: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    coverQueue.push({
      run: async () => {
        try { resolve(await work()) } catch (error) { reject(error) }
      },
    })
    void drainCoverQueue()
  })
}

async function drainCoverQueue() {
  if (coverQueueActive >= MAX_CONCURRENT_COVER_REQUESTS) return
  const item = coverQueue.shift()
  if (!item) return

  coverQueueActive += 1
  try {
    await item.run()
  } finally {
    coverQueueActive -= 1
    await sleep(COVER_REQUEST_GAP_MS)
    void drainCoverQueue()
    if (coverQueueActive < MAX_CONCURRENT_COVER_REQUESTS) void drainCoverQueue()
  }
}

async function findWikipediaArticle(query: string): Promise<WikiArticle | null> {
  if (articleMemory.has(query)) return articleMemory.get(query) ?? null

  try {
    const url = new URL(WIKIPEDIA)
    url.searchParams.set('action', 'query')
    url.searchParams.set('generator', 'search')
    url.searchParams.set('gsrsearch', query)
    url.searchParams.set('gsrnamespace', '0')
    url.searchParams.set('gsrlimit', '1')
    url.searchParams.set('prop', 'pageimages|info')
    url.searchParams.set('piprop', 'thumbnail|original')
    url.searchParams.set('pithumbsize', '1600')
    url.searchParams.set('inprop', 'url')
    url.searchParams.set('format', 'json')
    url.searchParams.set('origin', '*')

    const data = await fetchJsonWithRetry(url, 3)
    const first = Object.values(data?.query?.pages ?? {})[0] as any
    if (!first?.title) {
      articleMemory.set(query, null)
      return null
    }

    const source = first?.thumbnail?.source ?? first?.original?.source
    const article: WikiArticle = {
      title: first.title,
      pageUrl: first.fullurl,
      cover: source ? {
        url: first?.original?.source ?? source,
        thumbUrl: source,
        description: `${first.title} — Wikipedia lead image`,
        license: 'Wikipedia / Wikimedia Commons',
        sourcePage: first.fullurl,
      } : undefined,
    }

    articleMemory.set(query, article)
    return article
  } catch {
    return null
  }
}

export async function fetchWikipediaSummary(query: string): Promise<WikiSummary | null> {
  try {
    const article = await findWikipediaArticle(query)
    if (!article) return null

    const page = new URL(WIKIPEDIA)
    page.searchParams.set('action', 'query')
    page.searchParams.set('prop', 'extracts|info')
    page.searchParams.set('exintro', '1')
    page.searchParams.set('explaintext', '1')
    page.searchParams.set('inprop', 'url')
    page.searchParams.set('titles', article.title)
    page.searchParams.set('format', 'json')
    page.searchParams.set('origin', '*')

    const data = await fetchJsonWithRetry(page, 2)
    const first = Object.values(data?.query?.pages ?? {})[0] as { title?: string; extract?: string; fullurl?: string }
    return first?.extract ? {
      title: first.title ?? article.title,
      extract: first.extract,
      pageUrl: first.fullurl ?? article.pageUrl,
    } : null
  } catch {
    return null
  }
}

async function fetchCommonsExact(query: string, limit: number): Promise<WikimediaImage[]> {
  try {
    const url = new URL(COMMONS)
    url.searchParams.set('action', 'query')
    url.searchParams.set('generator', 'search')
    url.searchParams.set('gsrsearch', `\"${query}\"`)
    url.searchParams.set('gsrnamespace', '6')
    url.searchParams.set('gsrlimit', String(Math.max(limit * 2, 6)))
    url.searchParams.set('prop', 'imageinfo')
    url.searchParams.set('iiprop', 'url|extmetadata')
    url.searchParams.set('iiurlwidth', '1600')
    url.searchParams.set('format', 'json')
    url.searchParams.set('origin', '*')

    const data = await fetchJsonWithRetry(url, 2)
    return normalizeImagePages(Object.values(data?.query?.pages ?? {}) as any[], limit)
  } catch {
    return []
  }
}

async function fetchArticleImages(article: WikiArticle, limit: number): Promise<WikimediaImage[]> {
  try {
    const url = new URL(WIKIPEDIA)
    url.searchParams.set('action', 'query')
    url.searchParams.set('generator', 'images')
    url.searchParams.set('titles', article.title)
    url.searchParams.set('gimlimit', String(Math.min(Math.max(limit * 5, 20), 50)))
    url.searchParams.set('prop', 'imageinfo')
    url.searchParams.set('iiprop', 'url|extmetadata')
    url.searchParams.set('iiurlwidth', '1600')
    url.searchParams.set('format', 'json')
    url.searchParams.set('origin', '*')

    const data = await fetchJsonWithRetry(url, 2)
    return normalizeImagePages(Object.values(data?.query?.pages ?? {}) as any[], limit * 2)
  } catch {
    return []
  }
}

export async function fetchWikimediaGallery(query: string, limit = 7): Promise<WikimediaImage[]> {
  const cacheKey = `${query}::${limit}`
  const cached = galleryMemory.get(cacheKey)
  if (cached) return cached

  // On the dossier page we can afford a precise Commons search first.
  const exact = await fetchCommonsExact(query, limit)
  const article = await findWikipediaArticle(query)
  const articleImages = article ? await fetchArticleImages(article, limit) : []

  const merged: WikimediaImage[] = []
  const seen = new Set<string>()

  const add = (item?: WikimediaImage) => {
    if (!item?.thumbUrl) return
    const key = item.url || item.thumbUrl
    if (seen.has(key)) return
    seen.add(key)
    merged.push(item)
  }

  exact.forEach(add)
  if (article?.cover) add(article.cover)
  articleImages.forEach(add)

  const result = merged.slice(0, limit)
  galleryMemory.set(cacheKey, result)
  return result
}

export async function fetchWikimediaCover(query: string): Promise<WikimediaImage | null> {
  if (coverMemory.has(query)) return coverMemory.get(query) ?? null

  const storageKey = `${PHOTO_CACHE_PREFIX}${query}`
  try {
    const stored = window.localStorage.getItem(storageKey)
    if (stored) {
      const parsed = JSON.parse(stored) as WikimediaImage
      if (parsed?.thumbUrl) {
        coverMemory.set(query, parsed)
        return parsed
      }
    }
  } catch {
    // localStorage can be unavailable in private or restricted contexts.
  }

  return scheduleCoverRequest(async () => {
    if (coverMemory.has(query)) return coverMemory.get(query) ?? null

    // Covers deliberately use the Wikipedia lead image instead of Commons search.
    // This is one lightweight request per visible card and avoids hammering Commons.
    const article = await findWikipediaArticle(query)
    const image = article?.cover ?? null
    coverMemory.set(query, image)

    // Do not persist failures: a temporary 429/offline state must not become permanent.
    if (image) {
      try { window.localStorage.setItem(storageKey, JSON.stringify(image)) } catch { /* ignore */ }
    }

    return image
  })
}

function normalizeImagePages(pages: any[], limit: number): WikimediaImage[] {
  return pages
    .map((page) => {
      const title = String(page?.title ?? '')
      if (/\.(svg|gif|tif|tiff)$/i.test(title)) return null
      if (/(logo|icon|map|diagram|badge|flag|commons-logo|wikimedia)/i.test(title)) return null

      const ii = page?.imageinfo?.[0]
      const meta = ii?.extmetadata ?? {}
      const url = ii?.url
      const thumbUrl = ii?.thumburl ?? url
      if (!url || !thumbUrl || !/\.(jpe?g|png|webp)(\?|$)/i.test(url)) return null

      return {
        url,
        thumbUrl,
        description: stripHtml(meta?.ImageDescription?.value),
        artist: stripHtml(meta?.Artist?.value),
        license: meta?.LicenseShortName?.value,
        sourcePage: ii?.descriptionurl,
      } as WikimediaImage
    })
    .filter(Boolean)
    .slice(0, limit) as WikimediaImage[]
}

function stripHtml(value?: string) {
  if (!value) return undefined
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}
