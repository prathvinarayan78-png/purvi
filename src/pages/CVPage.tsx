import { Download, Printer } from 'lucide-react'
import PageIntro from '../components/PageIntro'

const experienceSlots = [
  {
    period: 'Dates to add',
    role: 'Most recent role or fellowship',
    organisation: 'Organisation and location to add',
    description: 'Add two or three outcomes that show Purvi’s contribution, research scope and policy impact.',
  },
  {
    period: 'Dates to add',
    role: 'Previous policy or research role',
    organisation: 'Organisation and location to add',
    description: 'Summarise responsibilities with specific evidence, outputs or stakeholder engagement.',
  },
  {
    period: 'Dates to add',
    role: 'Earlier experience',
    organisation: 'Organisation and location to add',
    description: 'Add relevant experience in research, public service, international affairs or adjacent fields.',
  },
]

export default function CVPage() {
  return (
    <main className="page-shell cv-page">
      <PageIntro
        index="04 / CURRICULUM VITAE"
        eyebrow="Experience & education"
        title={<>A practice grounded in <em>research and policy.</em></>}
        summary="A web-based CV for Purvi’s experience, education, capabilities and selected outputs. Unconfirmed personal details are shown as explicit editable fields."
        aside={
          <div className="cv-actions">
            <button type="button" onClick={() => window.print()}><Printer size={15} /> Print / Save PDF</button>
            <button type="button" className="is-disabled" disabled title="Add Purvi’s final PDF to enable this download"><Download size={15} /> Download PDF</button>
          </div>
        }
      />

      <div className="cv-document">
        <header className="cv-document-header">
          <div><span>Purvi</span><h2>Public Policy & International Relations Professional</h2></div>
          <div className="cv-contact-placeholder">
            <span>Email to add</span>
            <span>LinkedIn to add</span>
            <span>New Delhi, India</span>
          </div>
        </header>

        <section className="cv-row cv-summary">
          <h3>Profile</h3>
          <p>Public policy and international relations professional focused on geopolitical analysis, global institutions and the relationship between strategic change and practical policy choices.</p>
        </section>

        <section className="cv-row">
          <h3>Experience</h3>
          <div className="cv-timeline">
            {experienceSlots.map((item, index) => (
              <article key={index}>
                <span className="cv-period">{item.period}</span>
                <div><h4>{item.role}</h4><em>{item.organisation}</em><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-row">
          <h3>Education</h3>
          <div className="cv-timeline">
            <article>
              <span className="cv-period">Dates to add</span>
              <div><h4>Degree and field of study</h4><em>Institution and location to add</em><p>Add relevant coursework, distinction, dissertation or research focus if appropriate.</p></div>
            </article>
            <article>
              <span className="cv-period">Dates to add</span>
              <div><h4>Additional degree or credential</h4><em>Institution and location to add</em><p>Add only confirmed academic and professional credentials.</p></div>
            </article>
          </div>
        </section>

        <section className="cv-row cv-split-row">
          <div>
            <h3>Capabilities</h3>
            <div className="cv-tag-list">
              <span>Policy research</span><span>Geopolitical analysis</span><span>Strategic foresight</span><span>Policy writing</span><span>Stakeholder research</span><span>International cooperation</span>
            </div>
          </div>
          <div>
            <h3>Languages</h3>
            <p className="editable-field block-field">Add languages and proficiency</p>
          </div>
        </section>

        <section className="cv-row">
          <h3>Selected publications</h3>
          <div className="cv-publications">
            <p><span>01</span>Add publication title, publisher and date</p>
            <p><span>02</span>Add policy brief, report or essay</p>
            <p><span>03</span>Add another selected output</p>
          </div>
        </section>
      </div>
    </main>
  )
}
