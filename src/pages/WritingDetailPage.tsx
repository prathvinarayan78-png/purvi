import { ArrowLeft, Clock3 } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { writings } from '../content/writings'

export default function WritingDetailPage() {
  const { slug } = useParams()
  const entry = writings.find((item) => item.slug === slug)

  if (!entry) return <Navigate to="/writings" replace />

  return (
    <main className="article-page">
      <header className="article-header">
        <Link to="/writings"><ArrowLeft size={15} /> Back to writings</Link>
        <div className="article-label">{entry.category} · Editable article layout</div>
        <h1>{entry.title}</h1>
        <p>{entry.excerpt}</p>
        <div className="article-meta"><span>{entry.date}</span><span><Clock3 size={13} /> {entry.readTime}</span></div>
      </header>

      <article className="article-body">
        <aside>
          <span>In this essay</span>
          <a href="#argument">The central argument</a>
          <a href="#context">Strategic context</a>
          <a href="#implications">Policy implications</a>
        </aside>
        <div className="article-copy">
          <div className="editable-notice"><span>Editorial placeholder</span> This layout is ready for Purvi’s final article text. The prompts below show the intended structure and should be replaced before publication.</div>
          <section id="argument">
            <span className="article-section-number">01</span>
            <h2>The central argument</h2>
            <p className="placeholder-paragraph">Open with the core claim. Explain what has changed, why the prevailing interpretation is incomplete, and what the essay will contribute to the policy conversation.</p>
            <blockquote>“Add a concise pull quote that captures the essay’s most important idea.”</blockquote>
          </section>
          <section id="context">
            <span className="article-section-number">02</span>
            <h2>Strategic context</h2>
            <p className="placeholder-paragraph">Develop the evidence and geopolitical context here. Define the relevant actors, institutions, interests and constraints without reducing a complex system to a single cause.</p>
          </section>
          <section id="implications">
            <span className="article-section-number">03</span>
            <h2>Policy implications</h2>
            <p className="placeholder-paragraph">Close by identifying the choices available to policymakers, the trade-offs each choice carries, and the questions that deserve further research.</p>
          </section>
        </div>
      </article>
    </main>
  )
}
