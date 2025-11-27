import React from 'react'
import Hero from '../components/Hero'

import AboutContent from '../components/AboutContent'
import ServicesSection from '../components/Services'
import ClientCarousel from '../components/Client'
import BlogSection from '../components/Blog'
import Feeatured from '../components/Feetured'

function Home() {
  return (
    <>
      <Hero />
      <Feeatured />
      <AboutContent />
      <ServicesSection />
      <ClientCarousel />
      <BlogSection />
    </>
  )
}

export default Home