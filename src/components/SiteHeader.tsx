import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Policy work', to: '/work' },
  { label: 'Writings', to: '/writings' },
  { label: 'CV', to: '/cv' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label="Purvi, home" onClick={() => setMenuOpen(false)}>
        <span className="wordmark-symbol" aria-hidden="true">P</span>
        <span className="wordmark-copy">
          <strong>Purvi</strong>
          <small>Geopolitics · Policy · Diplomacy</small>
        </span>
      </Link>

      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => isActive ? 'is-active' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <Link className="nav-contact" to="/contact" onClick={() => setMenuOpen(false)}>
          Connect <ArrowUpRight size={15} strokeWidth={1.8} />
        </Link>
      </nav>

      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  )
}
