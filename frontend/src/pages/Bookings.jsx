import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAllBookings } from '../feetures/bookingSlice.js'
import { selectAllCars } from '../feetures/carsSlices.js'
import { selectCurrentUser } from '../feetures/UserSlices.js'

// Transparent themed bookings list page
export default function Bookings() {
  const bookings = useSelector(selectAllBookings)
  const cars = useSelector(selectAllCars)
  const currentUser = useSelector(selectCurrentUser)
  const today = useMemo(() => new Date().toISOString().slice(0,10), [])

  const enriched = useMemo(() => {
    return bookings.map(b => {
      const car = cars.find(c => c.id === b.carId)
      const expired = b.status === 'pending' && b.date < today
      return { ...b, car, expired }
    })
  }, [bookings, cars, today])

  return (
    <section className="relative w-full min-h-screen px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Bookings</h1>
          <p className="text-gray-600 mt-2">{currentUser ? `Logged in as ${currentUser.username}` : 'Not logged in'}</p>
        </div>

        {enriched.length === 0 && (
          <div className="rounded-xl bg-white/60 p-8 text-center text-gray-700 shadow">
            No bookings yet. Rent a car to get started.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enriched.map(b => (
            <div key={b.id} className="group relative rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 shadow hover:shadow-xl transition-shadow overflow-hidden">
              {b.car && (
                <div className="h-40 w-full overflow-hidden">
                  <img src={b.car.imageUrl} alt={b.car.name} className="h-full w-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                </div>
              )}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">{b.car ? b.car.name : 'Car removed'}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${b.expired ? 'bg-red-600 text-white' : b.status === 'pending' ? 'bg-yellow-500 text-black' : 'bg-[#10d28e] text-white'}`}>{b.expired ? 'Expired' : b.status}</span>
                </div>
                <p className="text-sm text-gray-500">Brand: {b.car ? b.car.brand : 'N/A'}</p>
                <div className="text-sm text-gray-700 flex flex-col gap-1">
                  <span>Date: {b.date}</span>
                  <span>Pickup: {b.pickup}</span>
                  <span>Dropoff: {b.dropoff}</span>
                </div>
                {b.instructions && (
                  <p className="text-xs text-gray-500 italic">“{b.instructions}”</p>
                )}
                <div className="text-xs text-gray-500">CNIC: {b.cnic}</div>
                <div className="text-xs text-gray-500">Customer: {b.name} ({b.phone})</div>
                {b.car && (
                  <div className="pt-2 text-sm font-medium text-[#1089ff] flex items-center gap-2">
                    <span>${b.car.pricePerDay} / day</span>
                    {b.fare && <span className="text-xs text-gray-600">Fare: ${b.fare}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
