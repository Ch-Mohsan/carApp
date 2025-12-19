import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllCars, setCarStatus } from '../feetures/carsSlices.js'
import { selectAllBookings } from '../feetures/bookingSlice.js'
import { selectCurrentUserWithRoles } from '../feetures/UserSlices.js'

// Keeps car.status aligned with bookings so UI that reads `status`
// reflects confirmed bookings immediately and auto-releases on cancel/expiry.
export default function AvailabilitySync() {
  const dispatch = useDispatch()
  const cars = useSelector(selectAllCars)
  const bookings = useSelector(selectAllBookings)
  const currentUser = useSelector(selectCurrentUserWithRoles)
  const today = useMemo(() => new Date().toISOString().slice(0,10), [])

  useEffect(() => {
    console.log(cars,".......cars data in Availablity ")
    // Only admins (who can view all bookings) should sync car.status client-side
    if (!currentUser || !currentUser.isAdmin) return
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
  }, [cars, bookings, today, dispatch, currentUser])

  return null
}
