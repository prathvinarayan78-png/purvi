import type { ReactNode } from 'react'

type PageIntroProps = {
  index: string
  eyebrow: string
  title: ReactNode
  summary: string
  aside?: ReactNode
}

export default function PageIntro({ index, eyebrow, title, summary, aside }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="page-intro-index">{index}</div>
      <div className="page-intro-main">
        <span className="page-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{summary}</p>
      </div>
      {aside && <div className="page-intro-aside">{aside}</div>}
    </section>
  )
}
