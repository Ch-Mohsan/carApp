import React from 'react'
import PageTransition from '../components/PageTransition'
import ServicesSection from '../components/Services'

function ServicesPage() {
  return (
    <PageTransition>
      <div className='container py-10'>
        <ServicesSection />
      </div>
    </PageTransition>
  )
}

export default ServicesPage