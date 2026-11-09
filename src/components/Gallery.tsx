import { ExternalLink, ImageOff, Maximize2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { CarEntry, WikimediaImage } from '../types'
import { fetchWikimediaGallery } from '../services/wikimedia'

export default function Gallery({ car }: { car: CarEntry }) {
  const [images, setImages] = useState<WikimediaImage[]>([])
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let live = true
    setLoading(true)
    fetchWikimediaGallery(`${car.brand} ${car.model}`, 6).then((result) => {
      if (live) { setImages(result); setActive(0); setLoading(false) }
    })
    return () => { live = false }
  }, [car.slug])

  if (loading) return <div className="gallery gallery--loading"><div className="skeleton" /><div className="gallery__rail"><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></div></div>

  if (!images.length) return (
    <div className="gallery gallery--empty">
      <ImageOff size={26} />
      <strong>Photo archive unavailable</strong>
      <p>Не удалось получить фотографии ни из точного поиска Wikimedia Commons, ни из связанной статьи Wikipedia. Попробуйте обновить страницу через несколько секунд.</p>
    </div>
  )

  const current = images[active]
  return (
    <div className="gallery">
      <div className="gallery__hero">
        <img src={current.thumbUrl} alt={`${car.brand} ${car.model}`} loading="eager" />
        <div className="gallery__shade" />
        <div className="gallery__license">
          <span>{current.license ?? 'Wikimedia Commons'}</span>
          {current.sourcePage && <a href={current.sourcePage} target="_blank" rel="noreferrer"><ExternalLink size={13} /> source</a>}
        </div>
        <Maximize2 className="gallery__max" size={18} />
      </div>
      <div className="gallery__rail">
        {images.slice(0, 5).map((image, index) => (
          <button key={image.thumbUrl} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)}>
            <img src={image.thumbUrl} alt={`Вид ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}
