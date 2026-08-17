import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import './App.css'

type Region = {
  id: string
  name: string
  subject: string
  x: number
  y: number
}

const regions: Region[] = [
  { id: 'europe', name: 'Europe', subject: 'Multilateralism', x: 421, y: 270 },
  { id: 'mena', name: 'MENA', subject: 'Climate & energy', x: 463, y: 347 },
  { id: 'south', name: 'Global South', subject: 'Equitable growth', x: 465, y: 483 },
  { id: 'indo', name: 'Indo-Pacific', subject: 'Security & trade', x: 603, y: 400 },
]

const focusAreas = [
  { number: '01', title: 'Policy research', detail: 'Evidence into action' },
  { number: '02', title: 'Geopolitical analysis', detail: 'Signals into insight' },
  { number: '03', title: 'Global cooperation', detail: 'Dialogue into progress' },
]

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="Purvi, home">
      <span className="wordmark-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span>purvi.</span>
    </a>
  )
}

function PolicyGlobe() {
  const [activeRegion, setActiveRegion] = useState(regions[3])
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const globeRef = useRef<HTMLDivElement>(null)

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    setCursor({ x, y })
  }

  return (
    <div
      className="globe-stage"
      ref={globeRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setCursor({ x: 0, y: 0 })}
      style={{
        '--tilt-x': `${cursor.y * -5}deg`,
        '--tilt-y': `${cursor.x * 6}deg`,
        '--drift-x': `${cursor.x * 10}px`,
        '--drift-y': `${cursor.y * 10}px`,
      } as React.CSSProperties}
      id="world"
    >
      <div className="globe-orbit globe-orbit-one" aria-hidden="true" />
      <div className="globe-orbit globe-orbit-two" aria-hidden="true" />

      <svg className="globe" viewBox="0 0 800 800" role="img" aria-labelledby="globe-title globe-desc">
        <title id="globe-title">An interactive world policy atlas</title>
        <desc id="globe-desc">Select a location to explore Purvi's international policy focus areas.</desc>
        <defs>
          <radialGradient id="globeFill" cx="36%" cy="27%" r="75%">
            <stop offset="0%" stopColor="#fffefa" />
            <stop offset="78%" stopColor="#eeece5" />
            <stop offset="100%" stopColor="#e7e4dc" />
          </radialGradient>
          <linearGradient id="landFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8d6c3" />
            <stop offset="100%" stopColor="#aebfaf" />
          </linearGradient>
          <clipPath id="globeClip">
            <circle cx="400" cy="400" r="286" />
          </clipPath>
          <filter id="globeShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="25" stdDeviation="30" floodColor="#16362a" floodOpacity=".14" />
          </filter>
          <filter id="pointGlow" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle className="globe-shadow" cx="400" cy="400" r="286" fill="url(#globeFill)" filter="url(#globeShadow)" />

        <g clipPath="url(#globeClip)">
          <g className="globe-grid" fill="none" stroke="#87998d" strokeWidth="1" opacity=".28">
            <ellipse cx="400" cy="400" rx="286" ry="87" />
            <ellipse cx="400" cy="400" rx="286" ry="174" />
            <ellipse cx="400" cy="400" rx="104" ry="286" />
            <ellipse cx="400" cy="400" rx="210" ry="286" />
            <path d="M114 400h572M133 300h534M133 500h534" />
          </g>

          <g className="continents" fill="url(#landFill)" stroke="#8fa594" strokeWidth="1.2">
            <path d="M152 244l36-42 63-24 64 12 35 27-11 25-33 8-21 32-22 6-16 39-29-8-9-29-27-7-30-39z" />
            <path d="M271 339l33 13 19 34-7 44 23 27-11 73-36 87-27-23-8-61-20-46 9-55-18-44 12-36z" />
            <path d="M369 212l40-25 42 5 23 27 60 5 46 29 64 10 57 46 1 35-32 12-20-18-31 8-20 35-29 7-31-25-35 13-32-37-43-9-7-34-36-3-14-31 22-21z" />
            <path d="M415 347l49-15 49 28 14 56-28 88-44 54-36-42-27-87 4-51z" />
            <path d="M609 481l44-14 45 30-8 41-47 22-38-28z" />
            <path d="M342 182l25-20 30 12-13 19z" />
            <path d="M681 417l14-24 17 16-10 30z" />
          </g>

          <g className="route-lines" fill="none" stroke="#c46d45" strokeWidth="2">
            <path d="M271 340Q394 175 603 400" />
            <path d="M421 270Q526 275 603 400" />
            <path d="M463 347Q544 357 603 400" />
            <path d="M465 483Q540 457 603 400" />
          </g>
        </g>

        <circle cx="400" cy="400" r="286" fill="none" stroke="#466054" strokeWidth="1.5" opacity=".5" />

        {regions.map((region) => {
          const active = region.id === activeRegion.id
          return (
            <g
              key={region.id}
              className={`map-point ${active ? 'is-active' : ''}`}
              transform={`translate(${region.x} ${region.y})`}
              role="button"
              aria-label={`${region.name}: ${region.subject}`}
              aria-pressed={active}
              tabIndex={0}
              onClick={() => setActiveRegion(region)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setActiveRegion(region)
                }
              }}
            >
              <circle className="point-wave" r="18" />
              <circle className="point-core" r="5" filter="url(#pointGlow)" />
            </g>
          )
        })}
      </svg>

      <div className="coordinate-label coordinate-top" aria-hidden="true">28.6139° N</div>
      <div className="coordinate-label coordinate-side" aria-hidden="true">77.2090° E</div>

      <div className="region-card" aria-live="polite">
        <span className="region-kicker">Current lens</span>
        <strong>{activeRegion.name}</strong>
        <span>{activeRegion.subject}</span>
      </div>

      <div className="globe-caption">
        <span className="caption-line" />
        <p><strong>Policy atlas</strong><br />Select a region to shift the lens</p>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <main className={`site-shell ${loaded ? 'is-loaded' : ''}`} id="top">
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <Wordmark />

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#focus" onClick={() => setMenuOpen(false)}>Expertise</a>
          <a href="#world" onClick={() => setMenuOpen(false)}>Perspective</a>
          <a className="nav-contact" href="mailto:hello@purvi.co" onClick={() => setMenuOpen(false)}>
            Let’s connect <ArrowUpRight size={15} strokeWidth={1.8} />
          </a>
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

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-copy" id="about">
          <div className="eyebrow reveal reveal-one">
            <span className="eyebrow-dot" />
            Public policy & international relations
          </div>

          <h1 id="hero-heading" className="reveal reveal-two">
            Navigating policy<br />
            in a world <em>in motion.</em>
          </h1>

          <p className="hero-intro reveal reveal-three">
            I’m Purvi — I study the forces reshaping our world and turn complex geopolitical change into clear, human-centred policy pathways.
          </p>

          <div className="hero-actions reveal reveal-four">
            <a className="primary-action" href="#focus">
              Explore my work
              <span><ArrowRight size={18} strokeWidth={1.7} /></span>
            </a>
            <a className="text-action" href="mailto:hello@purvi.co">
              Start a conversation <ArrowUpRight size={16} strokeWidth={1.7} />
            </a>
          </div>

          <div className="status-note reveal reveal-five">
            <span className="status-ring"><span /></span>
            <p><strong>Currently exploring</strong><br />The future of multilateral cooperation</p>
          </div>
        </div>

        <div className="hero-visual reveal reveal-visual">
          <PolicyGlobe />
        </div>

        <div className="side-note" aria-hidden="true">
          <span>Delhi</span>
          <i />
          <span>Global perspective</span>
        </div>
      </section>

      <section className="focus-strip" id="focus" aria-label="Areas of focus">
        <div className="focus-heading">
          <span>Areas of focus</span>
          <ArrowDownRight size={18} strokeWidth={1.5} />
        </div>
        <div className="focus-items">
          {focusAreas.map((item) => (
            <a className="focus-item" href={`mailto:hello@purvi.co?subject=${encodeURIComponent(item.title)}`} key={item.number}>
              <span className="focus-number">{item.number}</span>
              <span className="focus-copy">
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
              <ArrowUpRight className="focus-arrow" size={17} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
