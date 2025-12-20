
import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Layout from './pages/MainLayout'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import PricePage from './pages/PricePage'
import Cars from './pages/Cars'
import Login from './pages/Login'
import Landing from './pages/Landing'
import AddBoocking from './pages/AddBoocking'
import Bookings from './pages/Bookings'
import Rides from './pages/Rides'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'


function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // On app load, if a valid JWT exists, redirect root to /home
  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) return
      const parts = token.split('.')
      if (parts.length !== 3) return
      const payloadJson = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      const expSec = payloadJson?.exp
      const nowSec = Math.floor(Date.now() / 1000)
      const isValid = typeof expSec === 'number' && expSec > nowSec
      if (isValid && location.pathname === '/') {
        navigate('/home', { replace: true })
      }
    } catch {}
  }, [location.pathname, navigate])
  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      {/* Landing at root without layout */}
      <Route path="/" element={<Landing />} />

      {/* Public routes under layout */}
      <Route element={<Layout />}> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/price" element={<PricePage />} />
      </Route>

      {/* Protected routes: require login, still use layout */}
      <Route element={<ProtectedRoute />}> 
        <Route element={<Layout />}> 
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/add-booking" element={<AddBoocking />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/rides" element={<Rides />} />
        </Route>
      </Route>

      {/* Protected routes wrapper (auth required) */}
      <Route element={<ProtectedRoute />}> 
        <Route path="/add-booking" element={<AddBoocking />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
      </Route>

      {/* Auth pages without layout */}
      <Route path="/login" element={<Login />} />
    </Routes>
    </AnimatePresence>
  )
}

export default App