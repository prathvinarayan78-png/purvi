import { lazy, Suspense, useEffect, useState, type CSSProperties } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { policyRegions } from './policyRegions'
import './App.css'

const PolicyGlobe3D = lazy(() => import('./PolicyGlobe3D'))

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
  const [activeRegion, setActiveRegion] = useState(policyRegions[3])

  return (
    <div className="globe-stage" id="world">
      <div className="color-aura aura-blue" aria-hidden="true" />
      <div className="color-aura aura-coral" aria-hidden="true" />
      <div className="canvas-shell">
        <Suspense fallback={<div className="globe-loader" aria-label="Loading the 3D policy globe"><span /></div>}>
          <PolicyGlobe3D activeId={activeRegion.id} onSelect={setActiveRegion} />
        </Suspense>
      </div>

      <div className="coordinate-label coordinate-top" aria-hidden="true">28.6139° N</div>
      <div className="coordinate-label coordinate-side" aria-hidden="true">77.2090° E</div>
      <div className="axis-label" aria-hidden="true"><span>X</span><span>Y</span><span>Z</span></div>

      <div
        className="region-card"
        style={{ '--region-color': activeRegion.color } as CSSProperties}
        aria-live="polite"
      >
        <span className="region-kicker">Current lens · 0{policyRegions.findIndex((region) => region.id === activeRegion.id) + 1}</span>
        <strong>{activeRegion.name}</strong>
        <span>{activeRegion.subject}</span>
      </div>

      <div className="region-selector" role="group" aria-label="Choose a geopolitical focus region">
        {policyRegions.map((region) => (
          <button
            key={region.id}
            type="button"
            className={region.id === activeRegion.id ? 'is-active' : ''}
            style={{ '--node-color': region.color } as CSSProperties}
            aria-pressed={region.id === activeRegion.id}
            onClick={() => setActiveRegion(region)}
          >
            <span />
            {region.name}
          </button>
        ))}
      </div>

      <div className="globe-caption">
        <span className="caption-line" />
        <p><strong>Live policy atlas</strong><br />Move to orbit · select a node</p>
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

        <div className="hero-focus" id="focus" aria-label="Areas of focus">
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
        </div>
      </section>
    </main>
  )
}

export default App
