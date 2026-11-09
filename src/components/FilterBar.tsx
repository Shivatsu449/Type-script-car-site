import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { Segment } from '../types'

export default function FilterBar({
  query, setQuery, segment, setSegment, segments, total,
}: {
  query: string
  setQuery: (v: string) => void
  segment: Segment | 'All'
  setSegment: (v: Segment | 'All') => void
  segments: Segment[]
  total: number
}) {
  return (
    <div className="filterbar" id="catalog-search">
      <div className="searchbox">
        <Search size={18} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ferrari, Viper, GT3 RS…" aria-label="Поиск по машинам" />
        {query && <button onClick={() => setQuery('')} aria-label="Очистить поиск"><X size={16} /></button>}
      </div>
      <div className="filterbar__segments" aria-label="Фильтр по сегментам">
        <button className={segment === 'All' ? 'is-active' : ''} onClick={() => setSegment('All')}><SlidersHorizontal size={15} /> All</button>
        {segments.map((item) => <button key={item} className={segment === item ? 'is-active' : ''} onClick={() => setSegment(item)}>{item}</button>)}
      </div>
      <div className="filterbar__count">{total} MACHINES</div>
    </div>
  )
}
