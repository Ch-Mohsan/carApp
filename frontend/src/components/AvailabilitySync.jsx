import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllCars, setCarStatus } from '../feetures/carsSlices.js'
import { selectAllBookings } from '../feetures/bookingSlice.js'

// Keeps car.status aligned with bookings so UI that reads `status`
// reflects confirmed bookings immediately and auto-releases on cancel/expiry.
export default function AvailabilitySync() {
  const dispatch = useDispatch()
  const cars = useSelector(selectAllCars)
  const bookings = useSelector(selectAllBookings)
  const today = useMemo(() => new Date().toISOString().slice(0,10), [])

  useEffect(() => {
    if (!cars || !bookings) return
    cars.forEach(c => {
      const hasConfirmedFutureOrActive = bookings.some(b => {
        if (b.carId !== c.id) return false
        if (b.status !== 'confirmed') return false
        const end = (b.endDate || b.date || '').slice(0,10)
        return !!end && end >= today // confirmed booking in future or active
      })
      const hasPendingActive = bookings.some(b => {
        if (b.carId !== c.id) return false
        if (b.status !== 'pending') return false
        const start = (b.startDate || b.date || '').slice(0,10)
        const end = (b.endDate || b.date || '').slice(0,10)
        return !!start && !!end && start <= today && today <= end
      })
      const desired = (hasConfirmedFutureOrActive || hasPendingActive) ? 'booked' : 'available'
      const current = (c.status || '').trim().toLowerCase()
      if (current !== desired) {
        dispatch(setCarStatus({ id: c.id, status: desired }))
      }
    })
  }, [cars, bookings, today, dispatch])

  return null
}
