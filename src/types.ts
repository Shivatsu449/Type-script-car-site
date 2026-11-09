export type Segment = 'Hypercar' | 'Supercar' | 'Track' | 'GT' | 'Muscle' | 'Electric' | 'Icon'

export interface CarSpec {
  powerHp: number
  topSpeedKmh: number
  zeroTo100: number
  drivetrain: 'RWD' | 'AWD' | 'FWD'
  engine: string
  transmission: string
  weightKg: number
}

export interface CarEntry {
  id: number
  slug: string
  brand: string
  model: string
  year: number
  country: string
  segment: Segment
  accent: string
  mood: string
  era: string
  wikiTitle: string
  specs: CarSpec
  audience: string[]
  editorialAngles: string[]
}

export interface WikimediaImage {
  url: string
  thumbUrl: string
  description?: string
  artist?: string
  license?: string
  sourcePage?: string
}
