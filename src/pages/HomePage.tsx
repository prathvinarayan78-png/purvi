import { lazy, Suspense, useEffect, useState, type CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight, Compass, Layers3, Radar, Scale } from 'lucide-react'
import { Link } from 'react-router-dom'
import { writings } from '../content/writings'
import { policyRegions } from '../policyRegions'

const PolicyMap3D = lazy(() => import('../PolicyMap3D'))

function StrategicIndex() {
  const [activeRegion, setActiveRegion] = useState(policyRegions[0])
  const activeIndex = policyRegions.findIndex((region) => region.id === activeRegion.id)

  return (
    <section className="strategic-index" aria-labelledby="strategic-index-heading">
      <div className="strategic-index-sticky">
        <span>04 / Strategic index</span>
        <h2 id="strategic-index-heading">One world.<br /><em>Many vantage points.</em></h2>
        <p>Select a theatre to shift the analytical frame. Each region reveals a different intersection of power, institutions and interdependence.</p>
        <div className="strategic-index-count"><strong>0{activeIndex + 1}</strong><i /><small>04</small></div>
      </div>

      <div className="strategic-index-console" style={{ '--index-accent': activeRegion.color } as CSSProperties}>
        <div className="index-visual" aria-hidden="true">
          <div className="index-radar"><i /><i /><i /><i /><b /></div>
          <span>{activeRegion.code}</span>
          <small>Selected theatre</small>
        </div>
        <div className="index-reading" aria-live="polite">
          <div><span>{activeRegion.code}</span><small>STRATEGIC FRAME / 0{activeIndex + 1}</small></div>
          <h3>{activeRegion.name}</h3>
          <em>{activeRegion.subject}</em>
          <p>{activeRegion.detail}</p>
          <div className="index-signal"><i /> Relevance: {activeRegion.signal}</div>
        </div>
        <div className="index-controls" role="group" aria-label="Choose a strategic theatre">
          {policyRegions.map((region, index) => (
            <button
              type="button"
              key={region.id}
              className={region.id === activeRegion.id ? 'is-active' : ''}
              onClick={() => setActiveRegion(region)}
              aria-pressed={region.id === activeRegion.id}
            >
              <span>0{index + 1}</span><strong>{region.name}</strong><ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function PolicyMap() {
  const [activeRegion, setActiveRegion] = useState(policyRegions[3])
  const activeIndex = policyRegions.findIndex((region) => region.id === activeRegion.id)

  return (
    <div className="map-stage" id="map">
      <div className="map-aura" aria-hidden="true" />

      <div className="map-console-bar">
        <span><i /> Global strategic systems</span>
        <small>Open-source policy lens · 04 theatres</small>
      </div>

      <div className="map-canvas-shell">
        <Suspense fallback={<div className="map-loader" aria-label="Loading the 3D policy map"><span /></div>}>
          <PolicyMap3D activeId={activeRegion.id} onSelect={setActiveRegion} />
        </Suspense>
      </div>

      <div className="map-coordinate coordinate-north" aria-hidden="true">28.6139° N</div>
      <div className="map-coordinate coordinate-east" aria-hidden="true">77.2090° E</div>
      <div className="map-index" aria-hidden="true">GLOBAL ORDER / 2026</div>

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
        <div className="signal-state"><i />Strategic relevance · {activeRegion.signal}</div>
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

      <div className="map-legend" aria-label="Map legend">
        <span><i className="legend-theatre" />Strategic theatre</span>
        <span><i className="legend-corridor" />Trade corridor</span>
        <span><i className="legend-node" />Policy node</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealElements = document.querySelectorAll<HTMLElement>(
      '.home-depth > section, .focus-card, .systems-steps article, .home-writing-row',
    )

    if (reduceMotion) {
      revealElements.forEach((element) => element.classList.add('scroll-in-view'))
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('scroll-in-view')
      }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    revealElements.forEach((element) => observer.observe(element))

    let scrollFrame = 0
    const updateScroll = () => {
      scrollFrame = 0
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0
      document.documentElement.style.setProperty('--home-scroll', progress.toFixed(4))

      document.querySelectorAll<HTMLElement>('.home-parallax').forEach((section) => {
        const rect = section.getBoundingClientRect()
        const localProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        section.style.setProperty('--section-scroll', Math.max(0, Math.min(1, localProgress)).toFixed(4))
      })
    }
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll)
    }
    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(scrollFrame)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.documentElement.style.removeProperty('--home-scroll')
    }
  }, [])

  return (
    <div className={loaded ? 'is-loaded' : ''}>
      <div className="home-scroll-progress" aria-hidden="true"><i /></div>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-copy" id="about">
          <div className="eyebrow reveal reveal-one">
            <span>New Delhi</span>
            <i />
            <span>Foreign-policy analysis</span>
          </div>

          <h1 id="hero-heading" className="reveal reveal-two">
            Making sense<br />
            of <em>global power.</em>
          </h1>

          <p className="hero-intro reveal reveal-three">
            I’m Purvi, a public policy and international relations professional examining how power, institutions and strategic competition shape the choices available to states and societies.
          </p>

          <div className="expertise-line reveal reveal-three" aria-label="Areas of expertise">
            <span>Foreign policy</span>
            <span>Geopolitical risk</span>
            <span>Multilateral institutions</span>
          </div>

          <div className="hero-actions reveal reveal-four">
            <Link className="primary-action" to="/work">
              Explore my work
              <span><ArrowRight size={18} strokeWidth={1.7} /></span>
            </Link>
            <Link className="text-action" to="/writings">
              Read my writings <ArrowUpRight size={16} strokeWidth={1.7} />
            </Link>
          </div>

          <div className="brief-status reveal reveal-five">
            <div className="status-signal"><span /></div>
            <p><small>Current strategic brief</small>Multipolarity and the future of global institutions</p>
            <span className="brief-code">STRATEGIC / 01</span>
          </div>
        </div>

        <div className="hero-visual reveal reveal-visual">
          <PolicyMap />
        </div>

        <div className="hero-edge-label" aria-hidden="true">
          Statecraft · Global order · Security · Political economy
        </div>
      </section>

      <div className="signal-ribbon" aria-label="Core themes">
        <div>
          <span>Statecraft</span><i>✦</i><span>Global order</span><i>✦</i><span>Political economy</span><i>✦</i><span>Institutions</span><i>✦</i><span>Strategic foresight</span><i>✦</i>
          <span aria-hidden="true">Statecraft</span><i aria-hidden="true">✦</i><span aria-hidden="true">Global order</span><i aria-hidden="true">✦</i><span aria-hidden="true">Political economy</span><i aria-hidden="true">✦</i>
        </div>
      </div>

      <main className="home-depth">
        <section className="home-thesis" aria-labelledby="thesis-heading">
          <div className="home-section-index">
            <span>01 / Perspective</span>
            <small>Scroll to explore</small>
          </div>
          <div className="home-thesis-copy">
            <p className="home-kicker">A wider field of view</p>
            <h2 id="thesis-heading">The world does not move in <em>straight lines.</em></h2>
            <p>Policy choices emerge from overlapping histories, institutions, interests and human realities. My approach connects these layers—moving beyond the headline to understand the systems underneath.</p>
            <Link to="/about">More about my perspective <ArrowUpRight size={17} /></Link>
          </div>
          <aside className="thesis-aside">
            <span>Analytical orientation</span>
            <strong>Context</strong>
            <i />
            <strong>Evidence</strong>
            <i />
            <strong>Consequence</strong>
            <small>Three lenses. One connected picture.</small>
          </aside>
        </section>

        <section className="focus-section" aria-labelledby="focus-heading">
          <header className="home-section-heading">
            <div><span>02 / Field of inquiry</span><p>Where my attention goes</p></div>
            <h2 id="focus-heading">Reading power across <em>four dimensions.</em></h2>
          </header>

          <div className="focus-grid">
            <article className="focus-card focus-card-featured">
              <div className="focus-card-top"><span>01</span><Compass size={21} strokeWidth={1.35} /></div>
              <div className="focus-orbit" aria-hidden="true"><i /><i /><i /><b /></div>
              <div className="focus-card-copy">
                <small>Geopolitics</small>
                <h3>Power & statecraft</h3>
                <p>How states navigate competition, uncertainty and changing distributions of power.</p>
              </div>
            </article>
            <article className="focus-card">
              <div className="focus-card-top"><span>02</span><Layers3 size={21} strokeWidth={1.35} /></div>
              <div className="focus-card-copy">
                <small>Governance</small>
                <h3>Institutions & order</h3>
                <p>How international institutions adapt, endure and create room for collective action.</p>
              </div>
            </article>
            <article className="focus-card focus-card-gold">
              <div className="focus-card-top"><span>03</span><Scale size={21} strokeWidth={1.35} /></div>
              <div className="focus-card-copy">
                <small>Political economy</small>
                <h3>Markets & society</h3>
                <p>How economic systems, development priorities and strategic interests shape one another.</p>
              </div>
            </article>
            <article className="focus-card focus-card-mint">
              <div className="focus-card-top"><span>04</span><Radar size={21} strokeWidth={1.35} /></div>
              <div className="focus-card-copy">
                <small>Foresight</small>
                <h3>Risk & possibility</h3>
                <p>How weak signals and competing scenarios can inform more resilient policy choices.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="systems-section" aria-labelledby="systems-heading">
          <div className="systems-intro">
            <span>03 / Working method</span>
            <h2 id="systems-heading">From a complex world to a <em>clear argument.</em></h2>
            <p>Rigorous policy work requires both a wide lens and a precise method. This is the path I use to structure inquiry.</p>
            <Link className="systems-link" to="/work">Explore policy work <ArrowRight size={16} /></Link>
          </div>
          <div className="systems-steps">
            <article><span>01</span><h3>Frame the system</h3><p>Identify the actors, incentives and institutional constraints around the question.</p><small>Scope / Actors / Context</small></article>
            <article><span>02</span><h3>Trace the evidence</h3><p>Bring research, regional insight and competing interpretations into conversation.</p><small>Sources / Signals / Assumptions</small></article>
            <article><span>03</span><h3>Test the futures</h3><p>Examine trade-offs, second-order effects and plausible alternative scenarios.</p><small>Risks / Scenarios / Choices</small></article>
            <article><span>04</span><h3>Make it useful</h3><p>Translate complexity into an argument that is lucid, honest and actionable.</p><small>Clarity / Relevance / Impact</small></article>
          </div>
        </section>

        <StrategicIndex />

        <section className="home-writings" aria-labelledby="home-writings-heading">
          <header className="home-section-heading">
            <div><span>05 / Selected thinking</span><p>Essays, analysis & notes</p></div>
            <h2 id="home-writings-heading">Ideas to return to—and <em>argue with.</em></h2>
          </header>
          <div className="home-writing-list">
            {writings.slice(0, 3).map((entry, index) => (
              <Link to={`/writings/${entry.slug}`} className="home-writing-row" key={entry.slug}>
                <span className="home-writing-number">0{index + 1}</span>
                <div><small>{entry.category} · {entry.date}</small><h3>{entry.title}</h3></div>
                <p>{entry.excerpt}</p>
                <span className="home-writing-arrow"><ArrowUpRight size={20} /></span>
              </Link>
            ))}
          </div>
          <Link className="all-writing-link" to="/writings">View all writings <ArrowRight size={17} /></Link>
        </section>

        <section className="home-manifesto home-parallax">
          <div className="manifesto-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <span>06 / The essential question</span>
          <blockquote>“What does this shift in power make <em>possible</em>—and for whom?”</blockquote>
          <p>Good analysis should not only explain the world as it is. It should illuminate the choices that could shape what comes next.</p>
        </section>

        <section className="home-contact-cta">
          <span>07 / Connect</span>
          <div>
            <p>Research collaboration · Policy conversation · Writing</p>
            <h2>Let’s think through the <em>next question.</em></h2>
          </div>
          <Link to="/contact" aria-label="Contact Purvi"><ArrowUpRight size={30} strokeWidth={1.25} /></Link>
        </section>
      </main>
    </div>
  )
}
