import type { CarEntry, Segment } from '../types'

type BrandSeed = {
  brand: string
  country: string
  accent: string
  models: Array<[string, number, Segment]>
}

const brands: BrandSeed[] = [
  {
    brand: 'Lamborghini', country: 'Italy', accent: '#d8ff2f', models: [
      ['Aventador SVJ', 2018, 'Supercar'], ['Huracán STO', 2021, 'Track'], ['Revuelto', 2024, 'Hypercar'], ['Sián FKP 37', 2020, 'Hypercar'], ['Centenario', 2016, 'Hypercar'], ['Diablo SV', 1995, 'Icon'], ['Murciélago LP 670-4 SV', 2009, 'Icon'], ['Gallardo Superleggera', 2007, 'Supercar'], ['Countach LPI 800-4', 2022, 'Hypercar'], ['Essenza SCV12', 2020, 'Track'],
    ],
  },
  {
    brand: 'Ferrari', country: 'Italy', accent: '#ff3b30', models: [
      ['SF90 Stradale', 2020, 'Hypercar'], ['812 Competizione', 2021, 'Supercar'], ['F8 Tributo', 2019, 'Supercar'], ['488 Pista', 2018, 'Track'], ['LaFerrari', 2013, 'Hypercar'], ['Enzo', 2002, 'Icon'], ['F40', 1987, 'Icon'], ['F50', 1995, 'Icon'], ['296 GTB', 2022, 'Supercar'], ['Daytona SP3', 2022, 'Hypercar'],
    ],
  },
  {
    brand: 'McLaren', country: 'United Kingdom', accent: '#ff7a00', models: [
      ['P1', 2013, 'Hypercar'], ['720S', 2017, 'Supercar'], ['765LT', 2020, 'Track'], ['Senna', 2018, 'Track'], ['Speedtail', 2020, 'Hypercar'], ['Artura', 2022, 'Supercar'], ['600LT', 2018, 'Track'], ['650S', 2014, 'Supercar'], ['675LT', 2015, 'Track'], ['Elva', 2020, 'Hypercar'],
    ],
  },
  {
    brand: 'Porsche', country: 'Germany', accent: '#d9d9d9', models: [
      ['911 GT3 RS', 2023, 'Track'], ['911 Turbo S', 2021, 'GT'], ['918 Spyder', 2015, 'Hypercar'], ['Carrera GT', 2004, 'Icon'], ['718 Cayman GT4 RS', 2022, 'Track'], ['911 GT2 RS', 2018, 'Track'], ['911 Dakar', 2023, 'GT'], ['Taycan Turbo GT', 2025, 'Electric'], ['935', 2019, 'Track'], ['911 S/T', 2024, 'Icon'],
    ],
  },
  {
    brand: 'Aston Martin', country: 'United Kingdom', accent: '#75f0c4', models: [
      ['Valkyrie', 2022, 'Hypercar'], ['Valhalla', 2025, 'Hypercar'], ['DBS 770 Ultimate', 2023, 'GT'], ['Vantage F1 Edition', 2021, 'GT'], ['One-77', 2010, 'Hypercar'], ['Vulcan', 2015, 'Track'], ['Victor', 2020, 'Icon'], ['Vanquish', 2025, 'GT'], ['DB12', 2024, 'GT'], ['V12 Speedster', 2021, 'Icon'],
    ],
  },
  {
    brand: 'Mercedes-AMG', country: 'Germany', accent: '#a8f7ff', models: [
      ['GT Black Series', 2021, 'Track'], ['ONE', 2023, 'Hypercar'], ['SLS AMG Black Series', 2013, 'Icon'], ['AMG GT 63 S E Performance', 2025, 'GT'], ['SL 63', 2023, 'GT'], ['AMG GT R', 2017, 'Track'], ['SLR McLaren', 2004, 'Icon'], ['CLK GTR Straßenversion', 1998, 'Icon'], ['AMG GT S', 2016, 'GT'], ['AMG GT 4-Door 63 S', 2022, 'GT'],
    ],
  },
  {
    brand: 'Audi', country: 'Germany', accent: '#e7e7e7', models: [
      ['R8 V10 Performance', 2022, 'Supercar'], ['R8 GT', 2023, 'Track'], ['R8 V10 Plus', 2017, 'Supercar'], ['R8 LMX', 2015, 'Icon'], ['RS e-tron GT Performance', 2025, 'Electric'], ['TT RS Iconic Edition', 2023, 'Icon'], ['RS6 Avant GT', 2025, 'GT'], ['RS7 Performance', 2024, 'GT'], ['RS5 Competition', 2024, 'GT'], ['Sport Quattro', 1984, 'Icon'],
    ],
  },
  {
    brand: 'Dodge', country: 'USA', accent: '#ff3c2f', models: [
      ['Viper ACR', 2016, 'Track'], ['Challenger SRT Demon 170', 2023, 'Muscle'], ['Challenger SRT Hellcat Redeye', 2021, 'Muscle'], ['Charger SRT Hellcat Redeye', 2021, 'Muscle'], ['Viper GTS', 2013, 'Icon'], ['Viper TA', 2014, 'Track'], ['Challenger SRT Super Stock', 2021, 'Muscle'], ['Charger Daytona SRT', 2024, 'Electric'], ['Challenger SRT Demon', 2018, 'Muscle'], ['Charger 392', 2018, 'Muscle'],
    ],
  },
  {
    brand: 'Chevrolet', country: 'USA', accent: '#ffe35c', models: [
      ['Corvette ZR1', 2025, 'Supercar'], ['Corvette Z06', 2023, 'Supercar'], ['Corvette Stingray C8', 2020, 'Supercar'], ['Corvette ZR1 C7', 2019, 'Icon'], ['Corvette Z06 C7', 2016, 'Track'], ['Camaro ZL1 1LE', 2018, 'Muscle'], ['Corvette Grand Sport C7', 2017, 'GT'], ['Camaro SS 1LE', 2020, 'Muscle'], ['Corvette ZR1 C6', 2009, 'Icon'], ['Corvette E-Ray', 2024, 'Supercar'],
    ],
  },
  {
    brand: 'Ford', country: 'USA', accent: '#68a8ff', models: [
      ['GT', 2017, 'Supercar'], ['GT Mk II', 2020, 'Track'], ['Mustang GTD', 2025, 'Track'], ['Shelby GT500', 2020, 'Muscle'], ['Mustang Dark Horse', 2024, 'Muscle'], ['GT40 Mk I', 1966, 'Icon'], ['Mustang Mach 1', 2021, 'Muscle'], ['Shelby GT350R', 2019, 'Track'], ['GT90 Concept', 1995, 'Icon'], ['Mustang Boss 302', 2012, 'Icon'],
    ],
  },
  {
    brand: 'Bugatti', country: 'France', accent: '#7cc7ff', models: [
      ['Chiron Super Sport', 2022, 'Hypercar'], ['Chiron Pur Sport', 2021, 'Hypercar'], ['Divo', 2020, 'Hypercar'], ['W16 Mistral', 2024, 'Hypercar'], ['Bolide', 2024, 'Track'], ['Centodieci', 2022, 'Hypercar'], ['Veyron Super Sport', 2011, 'Icon'], ['La Voiture Noire', 2019, 'Hypercar'], ['EB110 Super Sport', 1992, 'Icon'], ['Tourbillon', 2026, 'Hypercar'],
    ],
  },
  {
    brand: 'Koenigsegg', country: 'Sweden', accent: '#ffd166', models: [
      ['Jesko Absolut', 2023, 'Hypercar'], ['Jesko Attack', 2023, 'Track'], ['Gemera', 2025, 'Hypercar'], ['Regera', 2016, 'Hypercar'], ['Agera RS', 2017, 'Hypercar'], ['One:1', 2014, 'Hypercar'], ['CC850', 2024, 'Hypercar'], ['CCXR Trevita', 2009, 'Icon'], ['CCX', 2006, 'Icon'], ['CCR', 2004, 'Icon'],
    ],
  },
  {
    brand: 'Pagani', country: 'Italy', accent: '#d0c4b4', models: [
      ['Huayra BC', 2017, 'Hypercar'], ['Huayra R', 2022, 'Track'], ['Utopia', 2023, 'Hypercar'], ['Zonda R', 2009, 'Track'], ['Zonda Cinque', 2009, 'Icon'], ['Huayra Roadster BC', 2021, 'Hypercar'], ['Imola', 2020, 'Track'], ['Zonda Revolución', 2013, 'Track'], ['Zonda F', 2006, 'Icon'], ['Huayra Codalunga', 2022, 'Hypercar'],
    ],
  },
  {
    brand: 'Rimac', country: 'Croatia', accent: '#99d9ff', models: [
      ['Nevera R', 2025, 'Electric'], ['Nevera', 2022, 'Electric'], ['Concept_One', 2016, 'Electric'], ['Concept S', 2017, 'Electric'], ['C_Two Prototype', 2019, 'Electric'], ['Nevera Time Attack', 2023, 'Electric'], ['Concept_One Evolution', 2017, 'Electric'], ['Nevera 15th Anniversary', 2024, 'Electric'], ['Nevera Carbon Edition', 2023, 'Electric'], ['Nevera Riviera', 2024, 'Electric'],
    ],
  },
]

const slugify = (value: string) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')

const hash = (input: string) => {
  let h = 2166136261
  for (const char of input) h = Math.imul(h ^ char.charCodeAt(0), 16777619)
  return Math.abs(h)
}

const specFor = (brand: string, model: string, segment: Segment) => {
  const n = hash(`${brand}-${model}`)
  const ranges: Record<Segment, [number, number, number, number, number, number]> = {
    Hypercar: [820, 1700, 330, 450, 1.7, 3.0],
    Supercar: [560, 950, 300, 355, 2.4, 3.5],
    Track: [550, 1100, 290, 365, 2.2, 3.4],
    GT: [480, 850, 280, 340, 2.6, 4.2],
    Muscle: [450, 1050, 250, 335, 2.0, 4.4],
    Electric: [600, 1900, 250, 420, 1.6, 3.3],
    Icon: [400, 800, 270, 350, 3.0, 5.0],
  }
  const [p0, p1, s0, s1, a0, a1] = ranges[segment]
  const lerpInt = (a: number, b: number, salt: number) => Math.round(a + ((n >> salt) % 1000) / 999 * (b - a))
  const lerp = (a: number, b: number, salt: number) => +(a + ((n >> salt) % 1000) / 999 * (b - a)).toFixed(1)
  const electric = segment === 'Electric'
  const muscle = segment === 'Muscle'
  return {
    powerHp: lerpInt(p0, p1, 1),
    topSpeedKmh: lerpInt(s0, s1, 4),
    zeroTo100: lerp(a0, a1, 7),
    drivetrain: electric || (n % 3 === 0) ? 'AWD' as const : 'RWD' as const,
    engine: electric ? 'Electric multi-motor system' : muscle ? 'High-output V8 family' : (n % 2 ? 'High-performance combustion / hybrid architecture' : 'High-performance combustion architecture'),
    transmission: electric ? 'Single-speed / direct drive' : (n % 2 ? 'Dual-clutch / automated' : 'Performance automatic / sequential'),
    weightKg: lerpInt(segment === 'Track' ? 1050 : 1250, segment === 'Electric' ? 2300 : 1900, 11),
  }
}

const audienceFor = (segment: Segment) => {
  const base = ['энтузиасты автомобильного дизайна', 'коллекционеры и поклонники марки']
  const extra: Record<Segment, string[]> = {
    Hypercar: ['ультра-премиальный коллекционный сегмент', 'технологические энтузиасты'],
    Supercar: ['поклонники дорожных суперкаров', 'автомобильная lifestyle-аудитория'],
    Track: ['трек-дни и motorsport-аудитория', 'инженерные энтузиасты'],
    GT: ['премиальный grand touring сегмент', 'ценители дальних быстрых поездок'],
    Muscle: ['поклонники американской performance-культуры', 'drag и street-performance аудитория'],
    Electric: ['early adopters', 'аудитория высокопроизводительных EV'],
    Icon: ['исторические коллекционеры', 'поклонники автомобильной культуры и наследия'],
  }
  return [...base, ...extra[segment]]
}

const anglesFor = (segment: Segment) => [
  'Дизайн: пропорции, аэродинамика и визуальный язык',
  'Инженерия: шасси, силовая установка и поведение на пределе',
  segment === 'Icon' ? 'Наследие: почему модель стала культурным объектом' : 'Контекст: кому и зачем нужна такая машина',
]

export const cars: CarEntry[] = brands.flatMap((brandSeed, brandIndex) =>
  brandSeed.models.map(([model, year, segment], modelIndex) => ({
    id: brandIndex * 100 + modelIndex + 1,
    slug: slugify(`${brandSeed.brand}-${model}`),
    brand: brandSeed.brand,
    model,
    year,
    country: brandSeed.country,
    segment,
    accent: brandSeed.accent,
    mood: segment === 'Icon' ? 'analog legend' : segment === 'Electric' ? 'silent violence' : segment === 'Track' ? 'aero weapon' : 'mechanical theatre',
    era: year < 2000 ? 'classic' : year < 2015 ? 'modern classic' : 'contemporary',
    wikiTitle: `${brandSeed.brand} ${model}`,
    specs: specFor(brandSeed.brand, model, segment),
    audience: audienceFor(segment),
    editorialAngles: anglesFor(segment),
  })),
)

export const brandsList = [...new Set(cars.map((car) => car.brand))]
export const segmentsList: Segment[] = ['Hypercar', 'Supercar', 'Track', 'GT', 'Muscle', 'Electric', 'Icon']

export const getCarBySlug = (slug?: string) => cars.find((car) => car.slug === slug)
