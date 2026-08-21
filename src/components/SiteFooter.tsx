import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-wordmark">
        <span>P</span>
        <p><strong>Purvi</strong><small>Public policy & international relations</small></p>
      </div>
      <p className="footer-note">A portfolio for research, writing and policy practice.</p>
      <div className="footer-links">
        <Link to="/writings">Writings</Link>
        <Link to="/cv">CV</Link>
        <Link to="/contact">Contact <ArrowUpRight size={13} /></Link>
      </div>
      <div className="footer-bottom">
        <span>New Delhi · Global perspective</span>
        <span>© {new Date().getFullYear()} Purvi</span>
      </div>
    </footer>
  )
}
