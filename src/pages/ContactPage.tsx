import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import PageIntro from '../components/PageIntro'

export default function ContactPage() {
  const openComposer = () => {
    window.location.href = 'mailto:?subject=Portfolio%20inquiry%20for%20Purvi'
  }

  return (
    <main className="page-shell contact-page">
      <PageIntro
        index="05 / CONTACT"
        eyebrow="Start a conversation"
        title={<>Good policy begins with a <em>better question.</em></>}
        summary="For research collaborations, policy projects, writing commissions or a thoughtful exchange on international affairs, get in touch."
        aside={<><span>Response details</span><strong>Contact information to add</strong><small>The layout is ready for Purvi’s preferred channels</small></>}
      />

      <section className="contact-grid">
        <div className="contact-panel">
          <span className="contact-index">DIRECT / 01</span>
          <h2>Contact details</h2>
          <div className="contact-method">
            <Mail size={17} />
            <div><small>Email</small><strong className="editable-field">Preferred email to add</strong></div>
          </div>
          <div className="contact-method">
            <MapPin size={17} />
            <div><small>Location</small><strong>New Delhi, India</strong></div>
          </div>
          <button type="button" className="composer-button" onClick={openComposer}>Open email composer <ArrowUpRight size={16} /></button>
          <p>The composer opens without a recipient until Purvi’s confirmed email address is supplied.</p>
        </div>

        <div className="contact-form-placeholder">
          <div className="form-heading"><span>PROJECT / 02</span><h2>Project inquiry</h2><p>Form structure prepared for a future form service or email integration.</p></div>
          <div className="form-grid" aria-label="Contact form preview">
            <label>Name<input type="text" placeholder="Your name" disabled /></label>
            <label>Email<input type="email" placeholder="you@example.com" disabled /></label>
            <label className="full-field">Area of interest<select disabled defaultValue=""><option value="">Select a topic</option></select></label>
            <label className="full-field">Message<textarea rows={5} placeholder="Tell Purvi about the question or project" disabled /></label>
            <button type="button" disabled>Form integration required <ArrowUpRight size={15} /></button>
          </div>
        </div>
      </section>
    </main>
  )
}
