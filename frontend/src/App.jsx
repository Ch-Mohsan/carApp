
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const location = useLocation()
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
          <Route path="/home" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/add-booking" element={<AddBoocking />} />
          <Route path="/bookings" element={<Bookings />} />
        </Route>
      </Route>

      {/* Protected routes wrapper (auth required) */}
      <Route element={<ProtectedRoute />}> 
        <Route path="/add-booking" element={<AddBoocking />} />
        <Route path="/bookings" element={<Bookings />} />
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