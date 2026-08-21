import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/': 'Purvi — Geopolitics, Policy & Diplomacy',
  '/about': 'About — Purvi',
  '/work': 'Policy Work — Purvi',
  '/writings': 'Writings — Purvi',
  '/cv': 'CV — Purvi',
  '/contact': 'Contact — Purvi',
}

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    document.title = pathname.startsWith('/writings/')
      ? 'Writing — Purvi'
      : pageTitles[pathname] ?? 'Purvi — Public Policy Portfolio'
  }, [pathname])

  return null
}
