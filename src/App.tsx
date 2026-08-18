import { lazy, Suspense, useEffect, useState, type CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { policyRegions } from './policyRegions'
import './App.css'

const PolicyMap3D = lazy(() => import('./PolicyMap3D'))

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="Purvi, home">
      <span className="wordmark-symbol" aria-hidden="true">P</span>
      <span className="wordmark-copy">
        <strong>Purvi</strong>
        <small>Policy · Diplomacy · Strategy</small>
      </span>
    </a>
  )
}

function PolicyMap() {
  const [activeRegion, setActiveRegion] = useState(policyRegions[3])
  const activeIndex = policyRegions.findIndex((region) => region.id === activeRegion.id)

  return (
    <div className="map-stage" id="map">
      <div className="map-aura" aria-hidden="true" />

      <div className="map-console-bar">
        <span><i /> Geopolitical field map</span>
        <small>Live analysis · 04 signals</small>
      </div>

      <div className="map-canvas-shell">
        <Suspense fallback={<div className="map-loader" aria-label="Loading the 3D policy map"><span /></div>}>
          <PolicyMap3D activeId={activeRegion.id} onSelect={setActiveRegion} />
        </Suspense>
      </div>

      <div className="map-coordinate coordinate-north" aria-hidden="true">28.6139° N</div>
      <div className="map-coordinate coordinate-east" aria-hidden="true">77.2090° E</div>
      <div className="map-index" aria-hidden="true">INTL / 2026</div>

      <div
        className="map-insight-card"
        style={{ '--signal-color': activeRegion.color } as CSSProperties}
        aria-live="polite"
      >
        <div className="insight-heading">
          <span>{activeRegion.code}</span>
          <small>0{activeIndex + 1} / 04</small>
        </div>
        <strong>{activeRegion.name}</strong>
        <em>{activeRegion.subject}</em>
        <p>{activeRegion.detail}</p>
        <div className="signal-state"><i />{activeRegion.signal}</div>
      </div>

      <div className="map-region-controls" role="group" aria-label="Select a geopolitical focus region">
        {policyRegions.map((region, index) => (
          <button
            key={region.id}
            type="button"
            className={region.id === activeRegion.id ? 'is-active' : ''}
            style={{ '--signal-color': region.color } as CSSProperties}
            aria-pressed={region.id === activeRegion.id}
            onClick={() => setActiveRegion(region)}
          >
            <span>0{index + 1}</span>
            <strong>{region.name}</strong>
          </button>
        ))}
      </div>

      <div className="map-instruction" aria-hidden="true">
        <span />
        Move to change perspective
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
          <a href="#about" onClick={() => setMenuOpen(false)}>Profile</a>
          <a href="#map" onClick={() => setMenuOpen(false)}>Policy lens</a>
          <a href="#brief" onClick={() => setMenuOpen(false)}>Expertise</a>
          <a className="nav-contact" href="mailto:hello@purvi.co" onClick={() => setMenuOpen(false)}>
            Connect <ArrowUpRight size={15} strokeWidth={1.8} />
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
            <span>New Delhi</span>
            <i />
            <span>Global systems</span>
          </div>

          <h1 id="hero-heading" className="reveal reveal-two">
            Policy for a<br />
            <em>shifting world.</em>
          </h1>

          <p className="hero-intro reveal reveal-three">
            I’m Purvi, a public policy and international relations professional translating geopolitical change into clear, practical paths forward.
          </p>

          <div className="expertise-line reveal reveal-three" id="brief" aria-label="Areas of expertise">
            <span>Policy research</span>
            <span>Strategic foresight</span>
            <span>Global cooperation</span>
          </div>

          <div className="hero-actions reveal reveal-four">
            <a className="primary-action" href="mailto:hello@purvi.co?subject=Policy%20conversation">
              Start a conversation
              <span><ArrowRight size={18} strokeWidth={1.7} /></span>
            </a>
            <a className="text-action" href="#map">
              Explore the policy lens <ArrowUpRight size={16} strokeWidth={1.7} />
            </a>
          </div>

          <div className="brief-status reveal reveal-five">
            <div className="status-signal"><span /></div>
            <p><small>Current inquiry</small>The future of multilateral cooperation</p>
            <span className="brief-code">BRIEF / 01</span>
          </div>
        </div>

        <div className="hero-visual reveal reveal-visual">
          <PolicyMap />
        </div>

        <div className="hero-edge-label" aria-hidden="true">
          Public policy · International relations · Geopolitical analysis
        </div>
      </section>
    </main>
  )
}

export default App
