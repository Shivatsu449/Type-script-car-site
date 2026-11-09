import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { CarEntry } from '../types'
import CarPhoto from './CarPhoto'

export default function CarCard({ car, index }: { car: CarEntry; index: number }) {
  const navigate = useNavigate()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 22 })
  const springY = useSpring(y, { stiffness: 180, damping: 22 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5])
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4])

  return (
    <motion.article
      className="car-card"
      style={{ rotateX, rotateY, transformPerspective: 900, '--car-accent': car.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '120px' }}
      transition={{ delay: Math.min(index * .025, .24), duration: .55, ease: [0.2, .7, .2, 1] }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left) / rect.width - .5)
        y.set((event.clientY - rect.top) / rect.height - .5)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
      onClick={() => navigate(`/car/${car.slug}`)}
      tabIndex={0}
      role="link"
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/car/${car.slug}`)}
    >
      <div className="car-card__index">{String(index + 1).padStart(3, '0')}</div>
      <div className="car-card__topline">
        <span>{car.segment}</span>
        <span>{car.year}</span>
      </div>
      <CarPhoto car={car} />
      <div className="car-card__copy">
        <div>
          <p>{car.brand}</p>
          <h3>{car.model}</h3>
        </div>
        <div className="car-card__arrow"><ArrowUpRight size={18} /></div>
      </div>
      <div className="car-card__telemetry">
        <span>{car.specs.powerHp} hp*</span>
        <span>{car.specs.zeroTo100}s*</span>
        <span>{car.specs.topSpeedKmh} km/h*</span>
      </div>
      <div className="car-card__flare" />
    </motion.article>
  )
}
