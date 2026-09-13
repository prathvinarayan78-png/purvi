import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CVPage from './pages/CVPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import WorkPage from './pages/WorkPage'
import WritingDetailPage from './pages/WritingDetailPage'
import WritingsPage from './pages/WritingsPage'
import './App.css'
import './pages.css'
import './home-sections.css'
import './home-interactions.css'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site-shell" id="top">
        <div className="grain" aria-hidden="true" />
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/writings" element={<WritingsPage />} />
          <Route path="/writings/:slug" element={<WritingDetailPage />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}
