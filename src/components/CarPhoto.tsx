import { useEffect, useRef, useState } from 'react'
import type { CarEntry, WikimediaImage } from '../types'
import { fetchWikimediaCover } from '../services/wikimedia'

export default function CarPhoto({
  car,
  className = '',
  eager = false,
}: {
  car: CarEntry
  className?: string
  eager?: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(eager)
  const [image, setImage] = useState<WikimediaImage | null>(null)
  const [loading, setLoading] = useState(eager)

  useEffect(() => {
    if (eager || shouldLoad) return
    const node = rootRef.current
    if (!node) return

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setShouldLoad(true)
        observer.disconnect()
      }
    }, { rootMargin: '500px 0px' })

    observer.observe(node)
    return () => observer.disconnect()
  }, [eager, shouldLoad])

  useEffect(() => {
    if (!shouldLoad) return

    let live = true
    setLoading(true)
    fetchWikimediaCover(`${car.brand} ${car.model}`).then((result) => {
      if (!live) return
      setImage(result)
      setLoading(false)
    })

    return () => { live = false }
  }, [car.slug, shouldLoad])

  return (
    <div ref={rootRef} className={`car-photo ${className} ${loading ? 'is-loading' : ''}`.trim()}>
      {image ? (
        <img src={image.thumbUrl} alt={`${car.brand} ${car.model}`} loading={eager ? 'eager' : 'lazy'} />
      ) : shouldLoad && !loading ? (
        <div className="car-photo__fallback">
          <span>PHOTO ARCHIVE</span>
          <strong>{car.brand}</strong>
          <b>{car.model}</b>
          <small>Для этой версии Wikimedia не вернула подходящую свободную фотографию.</small>
        </div>
      ) : null}
      <div className="car-photo__shade" />
    </div>
  )
}
