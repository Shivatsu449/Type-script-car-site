import { Search, Sparkles } from 'lucide-react'
import BrandMark from './BrandMark'

export default function Navbar({ onSearch }: { onSearch?: () => void }) {
  return (
    <header className="nav-shell">
      <nav className="nav">
        <BrandMark />
        <div className="nav__meta">
          <span className="nav__signal"><i /> 140 curated machines</span>
          {onSearch && (
            <button className="icon-button" onClick={onSearch} aria-label="Поиск по каталогу">
              <Search size={17} />
            </button>
          )}
          <div className="nav__edition"><Sparkles size={14} /> INDEX / 01</div>
        </div>
      </nav>
    </header>
  )
}
