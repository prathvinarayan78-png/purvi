import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'
import { writings } from '../content/writings'

export default function WritingsPage() {
  const [featured, ...remaining] = writings

  return (
    <main className="page-shell writings-page">
      <PageIntro
        index="03 / WRITINGS"
        eyebrow="Essays & analysis"
        title={<>Ideas for a world <em>in transition.</em></>}
        summary="Long-form essays, strategic analysis and shorter research notes on power, institutions and international cooperation. Titles and publication details are ready to be replaced with Purvi’s work."
        aside={<><span>Editorial lens</span><strong>Power · Policy · People</strong><small>Independent writing and published work</small></>}
      />

      <section className="featured-writing">
        <div className="featured-writing-visual" aria-hidden="true">
          <span>GLOBAL<br />ORDER</span>
          <i />
          <small>ESSAY / 01</small>
        </div>
        <article>
          <div className="writing-meta"><span>{featured.category}</span><span>{featured.date}</span></div>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <div className="editable-notice"><span>Placeholder</span> Replace this entry with a confirmed publication.</div>
          <Link to={`/writings/${featured.slug}`}>Open article layout <ArrowRight size={16} /></Link>
        </article>
      </section>

      <section className="writing-grid" aria-label="More writings">
        {remaining.map((entry, index) => (
          <article className="writing-card" key={entry.slug}>
            <div className="writing-card-top"><span>0{index + 2}</span><ArrowUpRight size={17} /></div>
            <div className="writing-meta"><span>{entry.category}</span><span>{entry.date}</span></div>
            <h2>{entry.title}</h2>
            <p>{entry.excerpt}</p>
            <Link to={`/writings/${entry.slug}`}>View article layout</Link>
          </article>
        ))}
      </section>

      <section className="newsletter-band">
        <div><span>Field notes</span><h2>Follow the next line of inquiry.</h2></div>
        <div className="newsletter-placeholder">
          <span>Newsletter integration ready</span>
          <button type="button" disabled>Subscribe</button>
        </div>
      </section>
    </main>
  )
}
