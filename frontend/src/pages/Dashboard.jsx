import React, { useMemo } from 'react'
import PageTransition from '../components/PageTransition'
import { useSelector } from 'react-redux'
import { selectCurrentUserWithRoles } from '../feetures/UserSlices.js'
import { selectAllBookings } from '../feetures/bookingSlice.js'
import { selectAllCars } from '../feetures/carsSlices.js'

export default function Dashboard() {
  const user = useSelector(selectCurrentUserWithRoles)
  const isAdmin = !!(user && user.isAdmin)
  const bookings = useSelector(selectAllBookings)
  const cars = useSelector(selectAllCars)

  const today = useMemo(() => new Date().toISOString().slice(0,10), [])
  const byId = useMemo(() => Object.fromEntries((cars||[]).map(c => [c.id, c])), [cars])

  // Current rentals: active bookings (pending or confirmed) and not expired
  const currentRentals = useMemo(() => {
    return (bookings||[])
      .filter(b => (b.status === 'pending' || b.status === 'confirmed'))
      .map(b => ({
        ...b,
        car: byId[b.carId] || null,
        period: `${b.startDate || b.date} → ${b.endDate || b.date}`
      }))
  }, [bookings, byId])

  // Upcoming bookings: start date in the future (simple string compare is fine for ISO yyyy-mm-dd)
  const upcoming = useMemo(() => {
    return (bookings||[])
      .filter(b => (b.startDate || b.date) > today)
      .map(b => ({
        ...b,
        car: byId[b.carId] || null,
        date: `${b.startDate || b.date} - ${b.endDate || b.date}`
      }))
  }, [bookings, byId, today])

  // Recent activity: latest bookings by date/status
  const recentActivity = useMemo(() => {
    const items = (bookings||[])
      .slice()
      .sort((a,b) => String(b.endDate||b.date).localeCompare(String(a.endDate||a.date)))
      .slice(0,5)
      .map(b => ({
        title: b.status === 'confirmed' ? 'Booking Confirmed' : b.status === 'cancelled' ? 'Booking Cancelled' : 'Booking Created',
        subtitle: `${byId[b.carId]?.name || 'Car'} - ${b.startDate || b.date}`,
        when: byId[b.carId] ? byId[b.carId].brand : '',
      }))
    return items
  }, [bookings, byId])
  return (
    <PageTransition>
      <section className='w-full px-4 md:px-8 py-12'>
        <div className='max-w-7xl mx-auto'>
          {!isAdmin && (
            <div className='rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3'>
              Access denied. Admins only.
            </div>
          )}
          {isAdmin && (
              <div className='space-y-8'>
                <div>
                  <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>Welcome back{user?.username ? `, ${user.username}` : ''}!</h1>
                  <p className='text-gray-600 mt-2'>Here’s what’s happening with your rentals.</p>
                </div>

                {/* Dynamic summary cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {(() => {
                    const activeCount = currentRentals.length
                    const totalSpent = (bookings||[])
                      .filter(b => b.status === 'confirmed')
                      .reduce((sum, b) => sum + Number(b.fare || 0), 0)
                    const points = Math.floor(totalSpent) // simple placeholder: 1 point per $1
                    const next = upcoming
                      .slice()
                      .sort((a,b) => String(a.startDate||a.date).localeCompare(String(b.startDate||b.date)))[0]
                    const nextLabel = next ? (next.startDate || next.date) : '—'

                    const cards = [
                      { title: 'Active Rentals', value: String(activeCount), sub: activeCount ? '+ Live' : 'No active rentals', icon: '🚗' },
                      { title: 'Total Spent', value: `$${totalSpent.toFixed(0)}`, sub: 'All time confirmed', icon: '💰' },
                      { title: 'Loyalty Points', value: String(points), sub: points >= 1000 ? 'Gold Status' : 'Member', icon: '⭐' },
                      { title: 'Next Booking', value: nextLabel, sub: next ? 'Upcoming' : 'None scheduled', icon: '📅' },
                    ]

                    return cards.map((k, i) => (
                      <div key={i} className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6'>
                        <div className='flex items-center justify-between'>
                          <h3 className='text-gray-700 font-semibold'>{k.title}</h3>
                          <span>{k.icon}</span>
                        </div>
                        <div className='mt-3 text-3xl font-extrabold text-gray-900'>{k.value}</div>
                        <div className='mt-1 text-sm text-gray-500'>{k.sub}</div>
                      </div>
                    ))
                  })()}
                </div>

              {/* Upper: Current Rentals with car images */}
              <div className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-4'>Current Rentals</h2>
                <div className='space-y-4'>
                  {currentRentals.length === 0 && (
                    <div className='text-sm text-gray-500'>No active rentals.</div>
                  )}
                  {currentRentals.map((r) => (
                    <div key={r.id} className='flex items-center justify-between gap-4'>
                      <div className='flex items-center gap-4'>
                        <div className='w-16 h-16 rounded-md overflow-hidden bg-gray-100'>
                          {r.car?.imageUrl ? (
                            <img src={r.car.imageUrl} alt={r.car.name} className='w-full h-full object.cover' />
                          ) : (
                            <div className='w-full h-full' />
                          )}
                        </div>
                        <div>
                          <div className='font-semibold text-gray-800'>{r.car?.name || 'Unknown Car'}</div>
                          <div className='text-sm text-gray-500'>{r.period}</div>
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='font-semibold text-gray-800'>${r.fare || r.car?.pricePerDay || 0}</div>
                        <div className='text-xs text-gray-500'>{r.status}</div>
                        <button className='text-sm text-[#1089ff] hover:underline'>View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lower: two columns side-by-side */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6'>
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>Recent Activity</h2>
                  <ul className='space-y-3'>
                    {recentActivity.length === 0 && <li className='text-sm text-gray-500'>No recent activity.</li>}
                    {recentActivity.map((a, i) => (
                      <li key={i} className='flex items-center justify-between'>
                        <div>
                          <div className='font-medium text-gray-800'>{a.title}</div>
                          <div className='text-sm text-gray-500'>{a.subtitle}</div>
                        </div>
                        <div className='text-sm text-gray-500'>{a.when}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6'>
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>Upcoming Bookings</h2>
                  <div className='space-y-4'>
                    {upcoming.length === 0 && (
                      <div className='text-sm text-gray-500'>No upcoming bookings.</div>
                    )}
                    {upcoming.map((u) => (
                      <div key={u.id} className='flex items-center justify-between'>
                        <div>
                          <div className='font-semibold text-gray-800'>{u.car?.name || 'Unknown Car'}</div>
                          <div className='text-sm text-gray-500'>{u.car?.brand || ''}</div>
                        </div>
                        <div className='text-right'>
                          <div className='font-semibold text-gray-800'>{u.date}</div>
                          <div className='text-[#1089ff]'>${u.fare || u.car?.pricePerDay || 0}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
