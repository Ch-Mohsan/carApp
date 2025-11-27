
import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

import Layout from './pages/MainLayout'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import PricePage from './pages/PricePage'
import Cars from './pages/Cars'
function App() {
  return (
   <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/pricing" element={<PricePage />} />
          <Route path="/cars" element={<Cars />} />
          
        </Routes>
      </Layout>
  )
}

export default App