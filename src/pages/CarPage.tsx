import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BadgeCheck, BookOpenText, Globe2, Layers3, Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import Gallery from '../components/Gallery'
import CarPhoto from '../components/CarPhoto'
import Editorial from '../components/Editorial'
import SpecsGrid from '../components/SpecsGrid'
import { cars, getCarBySlug } from '../data/cars'
import { fetchWikipediaSummary, type WikiSummary } from '../services/wikimedia'

export default function CarPage() {
  const { slug } = useParams()
  const car = getCarBySlug(slug)
  const [wiki, setWiki] = useState<WikiSummary | null>(null)
  const [wikiLoading, setWikiLoading] = useState(true)

  useEffect(() => {
    if (!car) return
    let live = true
    setWikiLoading(true)
    fetchWikipediaSummary(`${car.brand} ${car.model}`).then((data) => {
      if (live) { setWiki(data); setWikiLoading(false) }
    })
    return () => { live = false }
  }, [car?.slug])

  if (!car) {
    return <main className="page not-found"><Navbar /><div><h1>404</h1><p>Машина не найдена.</p><Link to="/">Вернуться в каталог</Link></div></main>
  }

  const index = cars.findIndex((item) => item.slug === car.slug)
  const next = cars[(index + 1) % cars.length]

  return (
    <motion.main className="page car-page" style={{ '--car-accent': car.accent } as React.CSSProperties} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <section className="dossier-hero section-shell">
        <div className="dossier-hero__crumb"><Link to="/"><ArrowLeft size={15} /> INDEX</Link><span>/</span><span>{car.brand.toUpperCase()}</span><span>/</span><b>{String(index + 1).padStart(3, '0')}</b></div>
        <div className="dossier-hero__copy">
          <div>
            <div className="section-kicker">MACHINE DOSSIER / {car.segment.toUpperCase()}</div>
            <p className="dossier-hero__brand">{car.brand}</p>
            <h1>{car.model}</h1>
          </div>
          <div className="dossier-hero__meta">
            <span><Globe2 size={14} /> {car.country}</span>
            <span><Layers3 size={14} /> {car.era}</span>
            <span><BadgeCheck size={14} /> {car.year}</span>
          </div>
        </div>
        <div className="dossier-stage-wrap">
          <div className="dossier-stage-wrap__label">PRIMARY PHOTO / REAL IMAGE ARCHIVE</div>
          <Gallery car={car} />
          <div className="dossier-stage-wrap__word">{car.brand.toUpperCase()}</div>
        </div>
        <SpecsGrid car={car} />
      </section>

      <section className="story section-shell">
        <div className="story__intro">
          <div className="section-kicker"><BookOpenText size={15} /> CONTEXT FILE</div>
          <h2>What exactly is<br />this machine?</h2>
        </div>
        <div className="story__text">
          {wikiLoading ? <><div className="text-skeleton" /><div className="text-skeleton text-skeleton--short" /></> : wiki ? (
            <>
              <p>{wiki.extract}</p>
              {wiki.pageUrl && <a href={wiki.pageUrl} target="_blank" rel="noreferrer">Wikipedia reference <ArrowRight size={14} /></a>}
            </>
          ) : (
            <p>{car.brand} {car.model} — объект из категории {car.segment.toLowerCase()}. Эта демо-сборка не подменяет энциклопедические источники выдуманными фактами: при наличии сети справочный блок автоматически запрашивает релевантную статью Wikipedia.</p>
          )}
        </div>
      </section>

      <section className="audience section-shell">
        <div className="audience__lead">
          <div className="section-kicker"><Users size={15} /> CULTURAL POSITION</div>
          <h2>Who is this<br />machine for?</h2>
          <p>Не «кто может купить», а где модель живёт культурно: какие сообщества следят за ней, что в ней считывают и почему она становится объектом желания или спора.</p>
        </div>
        <div className="audience__map">
          {car.audience.map((item, i) => <div className="audience-chip" key={item}><span>{String(i + 1).padStart(2, '0')}</span><strong>{item}</strong><i /></div>)}
          <div className="audience__axis"><span>NICHE</span><div /><span>CULTURAL REACH</span></div>
          <p className="audience__note">Audience labels are editorial framing for the prototype, not measured demographic or ownership statistics.</p>
        </div>
      </section>

      <Editorial car={car} />

      <section className="next-machine section-shell">
        <div className="next-machine__copy"><span>NEXT OBJECT / {String((index + 2)).padStart(3, '0')}</span><strong>{next.brand}</strong><h2>{next.model}</h2><Link to={`/car/${next.slug}`}>Open dossier <ArrowRight size={18} /></Link></div>
        <Link to={`/car/${next.slug}`} className="next-machine__visual"><CarPhoto car={next} /></Link>
      </section>

      <footer className="footer section-shell"><div className="brand-wordmark">NOIR<span>/</span>MACHINES</div><p>Knowledge first. Hype second. No storefront.</p><Link to="/">BACK TO INDEX</Link></footer>
    </motion.main>
  )
}
