import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <span>404 / OFF THE MAP</span>
      <h1>This route has no policy brief.</h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link to="/"><ArrowLeft size={16} /> Return home</Link>
    </main>
  )
}
