import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllCars, setCarStatus } from '../feetures/carsSlices.js'
import { selectAllBookings } from '../feetures/bookingSlice.js'

export default function AvailabilitySync() {
  const dispatch = useDispatch()
  const cars = useSelector(selectAllCars)
  const bookings = useSelector(selectAllBookings)
  const today = useMemo(() => new Date().toISOString().slice(0,10), [])

  useEffect(() => {
    if (!cars || !bookings) return
    cars.forEach(c => {
      const hasActive = bookings.some(b => b.carId === c.id && b.status === 'pending' && (b.endDate || b.date) >= today)
      const desired = hasActive ? 'booked' : 'available'
      if (c.status !== desired) {
        dispatch(setCarStatus({ id: c.id, status: desired }))
      }
    })
  }, [cars, bookings, today, dispatch])

  return null
}
