import React from 'react'
import Hero from '../components/Hero'
import Feeatured from '../components/Feeatured'
import AboutContent from '../components/AboutContent'
import ServicesSection from '../components/Services'
import ClientCarousel from '../components/Client'

function Home() {
  return (
    <>
      <Hero />
      <Feeatured />
      <AboutContent />
      <ServicesSection />
      <ClientCarousel />
    </>
  )
}

export default Home