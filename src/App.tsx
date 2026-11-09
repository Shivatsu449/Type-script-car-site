import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'
import CarPage from './pages/CarPage'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/car/:slug" element={<CarPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
