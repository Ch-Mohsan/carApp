import React from 'react'
import PageTransition from '../components/PageTransition'
import ServicesSection from '../components/Services'

function ServicesPage() {
  return (
    <PageTransition>
      <div>
        <ServicesSection />
      </div>
    </PageTransition>
  )
}

export default ServicesPage