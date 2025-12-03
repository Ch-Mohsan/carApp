import React from 'react'
import PageTransition from '../components/PageTransition'
import CarCard from '../components/CarCard'
import Alert from '../components/Alert'
import { useSelector } from 'react-redux'
import { selectAllCars, selectCarsLoading, selectCarsError } from '../feetures/carsSlices.js'

function Cars() {
  const cars = useSelector(selectAllCars)
  const loading = useSelector(selectCarsLoading)
  const error = useSelector(selectCarsError)
  return (
    <PageTransition>
      <section className='w-full px-4 md:px-8 py-12'>
        <div className='max-w-7xl mx-auto'>
          {loading && <Alert type='info' className='mb-4'>Loading cars…</Alert>}
          {error && !loading && <Alert type='error' className='mb-4'>{String(error)}</Alert>}
          {!loading && !error && cars.length === 0 && (
            <Alert type='warning'>No cars available right now. Please check back later.</Alert>
          )}
          <div>
            <CarCard />
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default Cars