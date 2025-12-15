import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllCars } from '../feetures/carsSlices.js'
import { selectAllBookings } from '../feetures/bookingSlice.js'

// Grid of car cards with dot-number pagination
// - Shows 12 items per page (4 rows x 3 columns)
// - Pagination dots 1..4; active dot has blue background and white text
// - Clicking a dot updates displayed cars
export default function CarCard({ cars }) {
  const PAGE_SIZE = 12; // 4 rows * 3 columns

  // Prefer Redux cars; fallback to prop; then fallback demo
  const storeCars = useSelector(selectAllCars)
  const bookings = useSelector(selectAllBookings)

  const today = useMemo(() => new Date().toISOString().slice(0,10), [])
  const data = useMemo(() => {
    const list = (storeCars && storeCars.length) ? storeCars : (cars || [])
    return list.map(c => {
      const statusBooked = ((c.status || '').trim().toLowerCase() === 'booked')
      const bookedByRange = (bookings || []).some(b => {
        if (String(b.carId) !== String(c.id)) return false
        const statusHolds = b.status === 'confirmed' || b.status === 'pending'
        if (!statusHolds) return false
        const start = (b.startDate || b.date || '').slice(0,10)
        const end = (b.endDate || b.date || '').slice(0,10)
        if (!end) return false
        // Consider car unavailable if there is any current or upcoming booking (end >= today)
        return end >= today
      })
      const booked = statusBooked || bookedByRange
      // prefer normalized imageURL; fallback to original fields
      const img = c.imageURL || c.imageUrl || c.img
      return {
        id: c.id,
        img,
        title: c.name || c.title,
        brand: c.brand,
        price: `$${c.pricePerDay ?? (c.price ? String(c.price).replace(/\$/,'') : '0')}`,
        booked
      }
    })
  }, [storeCars, cars, bookings, today])

  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE))
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  return (
    <section className="w-full py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        

        {/* Grid: 3 columns across devices; results in 4 rows when 12 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {paged.map((s) => (
            <div key={s.id} className="bg-white rounded-xl shadow-xl overflow-hidden relative">
              <div className="w-full h-48 sm:h-56 md:h-64 relative">
                <img src={s.img} alt={s.title} className={`w-full h-full object-cover ${s.booked ? 'blur-[2px] brightness-75' : ''}`} />
                {s.booked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-black/60 text-white text-sm font-semibold">Booked</span>
                  </div>
                )}
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{s.title}</h3>
                <p className="text-gray-500">{s.brand}</p>
                <p className="mt-2">
                  <span className="text-[#1089ff] font-bold">{s.price}</span>
                  <span className="text-gray-400"> /day</span>
                </p>
                <div className="flex gap-3 md:gap-4 mt-4">
                  <Link
                    to={s.booked ? '#' : `/add-booking?carId=${s.id}`}
                    className={`px-4 py-2.5 md:px-5 md:py-3 rounded-md font-semibold ${s.booked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#10d28e] hover:bg-[#0fb781] text-white'}`}
                    aria-disabled={s.booked}
                  >{s.booked ? 'Unavailable' : 'Rent now'}</Link>
                  <Link to={`/car/${s.id}`} className="px-4 py-2.5 md:px-5 md:py-3 bg-[#1089ff] hover:bg-[#0d75db] text-white rounded-md font-semibold">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Numbered dot pagination 1..4 */}
        <div className="flex items-center justify-center gap-3 mt-10" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-8 w-8 rounded-full border transition-colors flex items-center justify-center ${
                page === n ? "bg-[#1089ff] text-white border-transparent" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              aria-current={page === n ? "page" : undefined}
              aria-label={`Go to page ${n}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
