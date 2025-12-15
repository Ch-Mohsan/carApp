import React, { useEffect } from 'react'
import PageTransition from '../components/PageTransition'
import CarCard from '../components/CarCard'
import Alert from '../components/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllCars, selectCarsLoading, selectCarsError, fetchCarsThunk } from '../feetures/carsSlices.js'
import { fetchAllBookingsThunk } from '../feetures/bookingSlice.js'

function Cars() {
  const dispatch = useDispatch()
  const cars = useSelector(selectAllCars)
  const loading = useSelector(selectCarsLoading)
  const error = useSelector(selectCarsError)
  useEffect(() => {
    if (!cars || cars.length === 0) dispatch(fetchCarsThunk())
    // Also load bookings so CarCard can compute availability and disable rent
    dispatch(fetchAllBookingsThunk())
  }, [])
  return (
    <PageTransition>
      <section className='w-full px-4 md:px-8 py-12'>
          <div className='container py-10'>
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