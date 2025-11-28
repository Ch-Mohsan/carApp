
import React from 'react'
import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Routes>
      {/* Landing at root without layout */}
      <Route path="/" element={<Landing />} />

      {/* Routes that use the site layout (Navbar + hero + Footer) */}
      <Route element={<Layout />}> 
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/cars" element={<Cars />} />
      </Route>

      {/* Auth pages without layout */}
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App