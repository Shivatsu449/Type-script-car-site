import { Gauge, Timer, Weight, Zap } from 'lucide-react'
import type { CarEntry } from '../types'

export default function SpecsGrid({ car }: { car: CarEntry }) {
  const specs = [
    { icon: Zap, label: 'Power', value: `${car.specs.powerHp} hp*` },
    { icon: Timer, label: '0–100 km/h', value: `${car.specs.zeroTo100} s*` },
    { icon: Gauge, label: 'Top speed', value: `${car.specs.topSpeedKmh} km/h*` },
    { icon: Weight, label: 'Weight', value: `${car.specs.weightKg} kg*` },
  ]
  return (
    <div className="specs-grid">
      {specs.map(({ icon: Icon, label, value }) => <div className="spec-tile" key={label}><Icon size={17} /><span>{label}</span><strong>{value}</strong></div>)}
      <div className="specs-grid__note">* Демо-значения для UI-прототипа. Для энциклопедической публикации замените их на подтверждённые manufacturer / homologation данные.</div>
    </div>
  )
}
