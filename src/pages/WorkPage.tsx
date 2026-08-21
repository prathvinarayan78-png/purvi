import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'

const projects = [
  {
    number: '01',
    type: 'Policy research',
    title: 'Add Purvi’s featured policy project',
    summary: 'Use this space for the policy question, Purvi’s role, the research approach and the resulting recommendation or impact.',
    meta: ['Organisation', 'Year', 'Region'],
    tone: 'mint',
  },
  {
    number: '02',
    type: 'Geopolitical analysis',
    title: 'Add a strategic analysis project',
    summary: 'Present a geopolitical brief, scenario exercise or regional analysis with a concise account of methods and outcomes.',
    meta: ['Research format', 'Year', 'Theatre'],
    tone: 'gold',
  },
  {
    number: '03',
    type: 'International cooperation',
    title: 'Add a diplomacy or governance project',
    summary: 'Showcase work involving institutions, stakeholders or cross-border cooperation without disclosing confidential details.',
    meta: ['Programme', 'Year', 'Theme'],
    tone: 'forest',
  },
]

export default function WorkPage() {
  return (
    <main className="page-shell work-page">
      <PageIntro
        index="02 / POLICY WORK"
        eyebrow="Selected work"
        title={<>Research designed to <em>move policy.</em></>}
        summary="A home for Purvi’s policy research, strategic analysis and international cooperation projects. The cards below are editable structures awaiting confirmed project details."
        aside={<><span>Portfolio status</span><strong>Structure ready</strong><small>Project details to be supplied</small></>}
      />

      <section className="projects-list" aria-label="Selected projects">
        {projects.map((project) => (
          <article className={`project-card tone-${project.tone}`} key={project.number}>
            <div className="project-number">{project.number}</div>
            <div className="project-content">
              <span className="project-type">{project.type}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <div className="project-meta">
                {project.meta.map((item) => <span className="editable-field" key={item}>{item} to add</span>)}
              </div>
            </div>
            <div className="project-action" aria-hidden="true"><ArrowUpRight size={20} /></div>
          </article>
        ))}
      </section>

      <section className="work-method">
        <span className="method-kicker">From question to recommendation</span>
        <div className="method-steps">
          <div><span>01</span><strong>Frame</strong><p>Define the policy question, actors and strategic context.</p></div>
          <div><span>02</span><strong>Research</strong><p>Combine credible evidence with institutional and regional insight.</p></div>
          <div><span>03</span><strong>Interpret</strong><p>Surface trade-offs, scenarios and implications for decision-makers.</p></div>
          <div><span>04</span><strong>Communicate</strong><p>Turn complexity into a clear, usable policy argument.</p></div>
        </div>
      </section>

      <section className="page-cta">
        <div><span>Have a policy question?</span><h2>Let’s examine it together.</h2></div>
        <Link to="/contact">Start a conversation <ArrowRight size={17} /></Link>
      </section>
    </main>
  )
}
