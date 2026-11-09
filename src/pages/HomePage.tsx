import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Asterisk, CircleDot, MousePointer2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import CarCard from '../components/CarCard'
import FilterBar from '../components/FilterBar'
import CarPhoto from '../components/CarPhoto'
import { cars, segmentsList } from '../data/cars'
import type { Segment } from '../types'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState<Segment | 'All'>('All')
  const catalogRef = useRef<HTMLElement>(null)
  const featured = cars.find((car) => car.model === 'Aventador SVJ') ?? cars[0]
  const filtered = useMemo(() => cars.filter((car) => {
    const matchQuery = `${car.brand} ${car.model} ${car.segment}`.toLowerCase().includes(query.toLowerCase())
    return matchQuery && (segment === 'All' || car.segment === segment)
  }), [query, segment])

  return (
    <motion.main className="page home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar onSearch={() => document.getElementById('catalog-search')?.scrollIntoView({ behavior: 'smooth' })} />

      <section className="hero section-shell">
        <div className="hero__gridlines" />
        <div className="hero__eyebrow"><CircleDot size={14} /> MACHINE INDEX / OBSERVATION, NOT COMMERCE</div>
        <div className="hero__title-wrap">
          <h1>
            <span>Objects of</span>
            <em>velocity.</em>
          </h1>
          <p>Энциклопедия машин, которые существуют на границе дизайна, инженерии и культуры. Смотрите реальные фотографии, читайте статьи, изучайте контекст и сравнивайте — без ценников и витрины магазина.</p>
        </div>

        <Link to={`/car/${featured.slug}`} className="hero-car" style={{ '--car-accent': featured.accent } as React.CSSProperties}>
          <div className="hero-car__plate">
            <span>FEATURED OBJECT</span>
            <strong>{featured.brand}</strong>
            <h2>{featured.model}</h2>
            <small>{featured.year} · {featured.segment} · {featured.country}</small>
          </div>
          <CarPhoto car={featured} className="car-photo--hero" eager />
          <div className="hero-car__hover"><MousePointer2 size={16} /> hover / enter dossier</div>
          <div className="hero-car__scan" />
        </Link>

        <div className="hero__footer">
          <div><Asterisk size={17} /><span>140 machines<br /><b>14 marques</b></span></div>
          <div><span>real photography<br /><b>editorial gallery</b></span></div>
          <button onClick={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}>EXPLORE INDEX <ArrowDown size={16} /></button>
        </div>
      </section>

      <section className="manifesto section-shell">
        <div className="section-kicker">THE PRINCIPLE</div>
        <p><span>NOIR MACHINES</span> рассматривает автомобиль не как товар, а как артефакт. У каждой модели есть инженерный контекст, визуальный язык, культурная репутация и своя аудитория.</p>
      </section>

      <section ref={catalogRef} className="catalog section-shell">
        <div className="catalog__heading">
          <div>
            <div className="section-kicker">FULL MACHINE INDEX</div>
            <h2>Choose a machine.<br />Enter the dossier.</h2>
          </div>
          <p>Наведение даёт глубину и «подъём» карточки. Нажатие открывает отдельную страницу модели с главной фотографией, набором дополнительных снимков, справкой, статьями и профилем аудитории.</p>
        </div>

        <FilterBar query={query} setQuery={setQuery} segment={segment} setSegment={setSegment} segments={segmentsList} total={filtered.length} />

        <div className="catalog-grid">
          {filtered.map((car, index) => <CarCard car={car} index={index} key={car.slug} />)}
        </div>
        {!filtered.length && <div className="empty-state"><strong>Nothing in this slice.</strong><span>Измени поиск или сегмент.</span></div>}
      </section>

      <footer className="footer section-shell">
        <div className="brand-wordmark">NOIR<span>/</span>MACHINES</div>
        <p>Prototype editorial car index. Built with React, TypeScript and a photography-led interface.</p>
        <span>NO BUY BUTTONS.</span>
      </footer>
    </motion.main>
  )
}
