import React from 'react'
import Hero from '../components/Hero'
import Feeatured from '../components/Feeatured'
import AboutContent from '../components/AboutContent'
import ServicesSection from '../components/Services'

function Home() {
  return (
    <>
      <Hero />
      <Feeatured />
      <AboutContent />
      <ServicesSection />
    </>
  )
}

export default Home