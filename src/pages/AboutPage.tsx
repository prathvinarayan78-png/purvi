import { ArrowDownRight } from 'lucide-react'
import PageIntro from '../components/PageIntro'

const principles = [
  ['01', 'Evidence before assertion', 'Ground analysis in credible research, clear assumptions and intellectual honesty.'],
  ['02', 'Context before prescription', 'Understand institutions, interests and lived realities before proposing a policy response.'],
  ['03', 'Dialogue before distance', 'Treat cooperation and serious disagreement as essential parts of durable policy.'],
]

export default function AboutPage() {
  return (
    <main className="page-shell about-page">
      <PageIntro
        index="01 / PROFILE"
        eyebrow="About Purvi"
        title={<>Policy thinking with a <em>global frame.</em></>}
        summary="Purvi works at the intersection of public policy, international relations and geopolitical analysis—bringing structure, clarity and a human perspective to complex global questions."
        aside={<><span>Based in</span><strong>New Delhi</strong><small>Working across regions and disciplines</small></>}
      />

      <section className="profile-grid content-section">
        <div className="section-label"><span>Approach</span><ArrowDownRight size={17} /></div>
        <div className="profile-statement">
          <p className="lead-copy">I am interested in how shifts in power become choices in policy—and how those choices affect institutions, communities and international cooperation.</p>
          <div className="body-columns">
            <p>My work is shaped by a belief that geopolitical analysis should do more than describe competition. It should clarify trade-offs, reveal interdependence and help decision-makers identify credible paths forward.</p>
            <p>This portfolio is designed to bring together research, policy projects and writing. Personal education and experience details can be added once Purvi’s final CV content is supplied.</p>
          </div>
          <div className="editable-notice"><span>Content note</span> Biography details are intentionally limited to confirmed information.</div>
        </div>
      </section>

      <section className="principles-section content-section">
        <div className="section-label"><span>Working principles</span><ArrowDownRight size={17} /></div>
        <div className="principles-grid">
          {principles.map(([number, title, description]) => (
            <article key={number} className="principle-card">
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="interests-band">
        <span className="band-label">Areas of inquiry</span>
        <div>
          <strong>Global order</strong>
          <strong>Foreign policy</strong>
          <strong>Multilateral institutions</strong>
          <strong>Political economy</strong>
          <strong>Strategic competition</strong>
          <strong>Equitable development</strong>
        </div>
      </section>
    </main>
  )
}
