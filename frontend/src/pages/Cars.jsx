import React from 'react'
import PageTransition from '../components/PageTransition'
import CarCard from '../components/CarCard'

function Cars() {
  return (
    <PageTransition>
      <div>
        <CarCard />
      </div>
    </PageTransition>
  )
}

export default Cars