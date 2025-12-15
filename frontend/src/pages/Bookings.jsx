import React, { useMemo, useEffect } from 'react'
import PageTransition from '../components/PageTransition'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllBookings, selectBookingsLoading, selectBookingsError, fetchAllBookingsThunk, cancelBookingThunk } from '../feetures/bookingSlice.js'
import { selectAllCars, fetchCarsThunk } from '../feetures/carsSlices.js'
import { selectCurrentUser } from '../feetures/UserSlices.js'
import Alert from '../components/Alert'

// Transparent themed bookings list page
export default function Bookings() {
  const dispatch = useDispatch()
  const bookings = useSelector(selectAllBookings)
  const loading = useSelector(selectBookingsLoading)
  const error = useSelector(selectBookingsError)
  const cars = useSelector(selectAllCars)
  const currentUser = useSelector(selectCurrentUser)
  const today = useMemo(() => new Date().toISOString().slice(0,10), [])

  const fmt = React.useCallback((d) => {
    if (!d) return '—'
    try {
      const dt = new Date(d)
      const y = dt.getFullYear()
      const m = String(dt.getMonth()+1).padStart(2,'0')
      const dd = String(dt.getDate()).padStart(2,'0')
      const hh = String(dt.getHours()).padStart(2,'0')
      const mm = String(dt.getMinutes()).padStart(2,'0')
      return `${y}-${m}-${dd} ${hh}:${mm}`
    } catch { return String(d) }
  }, [])

  const enriched = useMemo(() => {
    return bookings.map(b => {
      const car = cars.find(c => c.id === b.carId)
      const end = b.endDate || b.date
      const expired = b.status === 'pending' && end < today
       console.log(currentUser,"..................user.........")
      return { ...b, car, expired, _period: `${fmt(b.startDate || b.date)} → ${fmt(b.endDate || b.date)}` }
    })
  }, [bookings, cars, today])

  const onCancel = (booking) => {
    if (booking.status !== 'pending') return
    dispatch(cancelBookingThunk(booking.id))
      .unwrap()
      .then(() => toast.success('Booking cancelled'))
      .catch((e) => toast.error(typeof e === 'string' ? e : (e?.message || 'Failed to cancel booking')))

  }

  useEffect(() => {
    dispatch(fetchAllBookingsThunk())
    dispatch(fetchCarsThunk())
  }, [dispatch])

  const statusChipClass = (b) => {
    if (b.expired) return 'bg-red-600 text-white'
    switch (b.status) {
      case 'pending': return 'bg-yellow-500 text-black'
      case 'confirmed': return 'bg-blue-600 text-white'
      case 'cancelled': return 'bg-gray-400 text-white'
      default: return 'bg-[#10d28e] text-white'
    }
  }

  return (
    <PageTransition>
    <section className="relative w-full min-h-screen py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="heading-2">Your Bookings</h1>
          <p className="paragraph mt-2">{currentUser ? `Logged in as ${currentUser.username}` : 'Not logged in'}</p>
        </div>

        {loading && <Alert type='info' className='mb-4'>Loading bookings…</Alert>}
        {error && !loading && <Alert type='error' className='mb-4'>{String(error)}</Alert>}
        {!loading && !error && enriched.length === 0 && (
          <Alert type='warning'>No bookings yet. Rent a car to get started.</Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enriched.map(b => (
            <div key={b.id} className="group relative rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 shadow hover:shadow-xl transition-shadow overflow-hidden">
              {b.car && (
                <div className="h-40 w-full overflow-hidden">
                  <img src={b.car.imageURL} alt={b.car.name} className="h-full w-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                </div>
              )}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">{b.car ? b.car.name : 'Car removed'}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusChipClass(b)}`}>{b.expired ? 'Expired' : b.status}</span>
                </div>
                <p className="text-sm text-gray-500">Brand: {b.car ? b.car.brand : 'N/A'}</p>
                <div className="text-sm text-gray-700 flex flex-col gap-1">
                  <span>Period: {b._period}</span>
                  <span>Pickup: {b.pickup}</span>
                  <span>Dropoff: {b.dropoff}</span>
                </div>
                {b.instructions && (
                  <p className="text-xs text-gray-500 italic">“{b.instructions}”</p>
                )}
                <div className="text-xs text-gray-500">CNIC: {b.Cnic || b.cnic}</div>
                <div className="text-xs text-gray-500">Customer: {b.name} ({b.phone})</div>
                {b.car && (
                  <div className="pt-2 text-sm font-medium text-[#1089ff] flex items-center gap-2">
                    <span>${b.car.pricePerDay} / day</span>
                    {b.fare && <span className="text-xs text-gray-600">Fare: ${b.fare}</span>}
                  </div>
                )}
                <div className="pt-3 space-y-2">
                  {b.status === 'pending' && !b.expired && (
                    <div className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-200 rounded px-2 py-1">You can cancel booking before admin approved.</div>
                  )}
                  {b.status === 'confirmed' && (
                    <div className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded px-2 py-1">Admin confirmed your booking. You cannot cancel.</div>
                  )}
                  {b.status === 'cancelled' && (
                    <div className="text-xs text-gray-600 bg-gray-100 border border-gray-200 rounded px-2 py-1">Booking cancelled.</div>
                  )}
                  {b.expired && (
                    <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">Booking expired.</div>
                  )}
                  <button
                    onClick={() => onCancel(b)}
                    disabled={b.status !== 'pending' || b.expired}
                    className={`w-full btn ${b.status === 'pending' && !b.expired ? 'btn-primary !w-full' : '!bg-gray-300 !text-gray-500 cursor-not-allowed !w-full'}`}
                  >Cancel Booking</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </PageTransition>
  )
}
