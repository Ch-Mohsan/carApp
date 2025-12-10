import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { useSelector } from 'react-redux'
import { selectCurrentUserWithRoles } from '../feetures/UserSlices.js'
import { selectAllBookings } from '../feetures/bookingSlice.js'
import { selectAllCars } from '../feetures/carsSlices.js'
import BookingDetailsModal from '../components/BookingDetailsModal'
import AdminUsersTable from '../components/AdminUsersTable'
import AdminSidebar from '../components/AdminSidebar'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const user = useSelector(selectCurrentUserWithRoles)
  const isAdmin = !!(user && user.isAdmin)
  const bookings = useSelector(selectAllBookings)
  const cars = useSelector(selectAllCars)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const section = searchParams.get('section') || null
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const compute = () => setIsMobile(window.innerWidth < 768)
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const today = useMemo(() => new Date().toISOString().slice(0,10), [])
  const byId = useMemo(() => Object.fromEntries((cars||[]).map(c => [c.id, c])), [cars])
  const [selected, setSelected] = useState(null) // booking id
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'confirmed' | 'pending'

  // Current rentals: active bookings (pending or confirmed) and not expired
  const currentRentals = useMemo(() => {
    const base = (bookings||[])
      .filter(b => (b.status === 'pending' || b.status === 'confirmed'))
      .map(b => ({
        ...b,
        car: byId[b.carId] || null,
        period: `${b.startDate || b.date} → ${b.endDate || b.date}`
      }))
    if (statusFilter === 'all') return base
    return base.filter(b => b.status === statusFilter)
  }, [bookings, byId, statusFilter])

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
      <section className='dashboard'>
        <aside className='dashboard-sidebar hidden lg:block'>
          <AdminSidebar />
        </aside>
        <div className='dashboard-content'>
          {!isAdmin && (
            <div className='rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3'>
              Access denied. Admins only.
            </div>
          )}
          {isAdmin && (
              <motion.div className='space-y-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              >
                {!section && (
                <div>
                  <motion.h1 className='text-3xl md:text-4xl font-bold text-gray-800'
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                  >Welcome back{user?.username ? `, ${user.username}` : ''}!</motion.h1>
                  <motion.p className='text-gray-600 mt-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.08, type: 'spring', stiffness: 180, damping: 26 }}
                  >Here’s what’s happening with your rentals.</motion.p>
                </div>
                )}

                {/* Dynamic summary cards (hidden when section overlay is active) */}
                {!section && (
                <motion.div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
                  initial="hidden" animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
                  }}
                >
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

                    const Icon = ({ name }) => {
                      const base = 'h-5 w-5'
                      switch (name) {
                        case 'car':
                          return (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
                              <path d="M3 13l2.5-6A2 2 0 017.4 5h9.2a2 2 0 011.9 2l2.5 6v5a1 1 0 01-1 1h-1a2 2 0 01-2-2v-1H6v1a2 2 0 01-2 2H3a1 1 0 01-1-1v-5zm4.5 0h9l-1.8-4.5a1 1 0 00-.93-.63H10.23a1 1 0 00-.93.63L7.5 13zM7 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                          )
                        case 'money':
                          return (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
                              <path d="M3 6.75A1.75 1.75 0 014.75 5h14.5A1.75 1.75 0 0121 6.75v10.5A1.75 1.75 0 0119.25 19H4.75A1.75 1.75 0 013 17.25V6.75zm2.5.75v9h13v-9h-13zm6.5 1.5a3 3 0 110 6 3 3 0 010-6z" />
                            </svg>
                          )
                        case 'star':
                          return (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                            </svg>
                          )
                        case 'calendar':
                          return (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
                              <path d="M7 2.75a.75.75 0 01.75.75v1h8.5v-1a.75.75 0 011.5 0v1H19a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2v-12a2 2 0 012-2h.25v-1A.75.75 0 017 2.75zM5 8v10h14V8H5z" />
                            </svg>
                          )
                        default:
                          return null
                      }
                    }

                    const cards = [
                      { title: 'Active Rentals', value: String(activeCount), sub: activeCount ? '+ Live' : 'No active rentals', icon: 'car' },
                      { title: 'Total Spent', value: `$${totalSpent.toFixed(0)}`, sub: 'All time confirmed', icon: 'money' },
                      { title: 'Loyalty Points', value: String(points), sub: points >= 1000 ? 'Gold Status' : 'Member', icon: 'star' },
                      { title: 'Next Booking', value: nextLabel, sub: next ? 'Upcoming' : 'None scheduled', icon: 'calendar' },
                    ]

                    return cards.map((k, i) => (
                      <motion.div key={i} className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6'
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                      >
                        <div className='flex items-center justify-between'>
                          <h3 className='text-gray-700 font-semibold'>{k.title}</h3>
                          <span className='text-[#01d28e]'><Icon name={k.icon} /></span>
                        </div>
                        <div className='mt-3 text-3xl font-extrabold text-gray-900'>{k.value}</div>
                        <div className='mt-1 text-sm text-gray-500'>{k.sub}</div>
                      </motion.div>
                    ))
                  })()}
                </motion.div>
                )}

              {/* Current Rentals (hidden when section overlay is active) */}
              {!section && (
              <motion.div className='grid grid-cols-1 lg:grid-cols-3 gap-6'
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 26 }}
              >
                <motion.div className='lg:col-span-2 rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6'
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                >
                  <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-xl font-bold text-gray-900'>Current Rentals</h2>
                    <div className='text-sm text-gray-500'>{currentRentals.length} item(s)</div>
                  </div>
                  <div className='space-y-4'>
                    {currentRentals.length === 0 && (
                      <div className='text-sm text-gray-500'>No active rentals.</div>
                    )}
                    {currentRentals.map((r) => (
                      <motion.div key={r.id} className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 rounded-xl border border-gray-100 p-3 md:p-4'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                      >
                        <div className='flex items-center gap-4 flex-1 min-w-0'>
                          <div className='w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0'>
                            {r.car?.imageUrl ? (
                              <img src={r.car.imageUrl} alt={r.car.name} className='w-full h-full object-cover' />
                            ) : (
                              <div className='w-full h-full' />
                            )}
                          </div>
                          <div className='min-w-0'>
                            <div className='font-semibold text-gray-800 whitespace-normal break-words'>{r.car?.name || 'Unknown Car'}</div>
                            <div className='text-sm md:text-base text-gray-500 whitespace-normal break-words'>{r.period}</div>
                          </div>
                        </div>
                        <div className='text-right md:text-right flex-shrink-0 md:self-start md:mt-0 mt-2'>
                          <div className='font-semibold text-gray-800'>${r.fare || r.car?.pricePerDay || 0}</div>
                          <div className='text-xs text-gray-500 capitalize'>{r.status}</div>
                          <button onClick={() => setSelected(r.id)} className='text-sm text-[#1089ff] hover:underline'>View Details</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                {/* Right-side filter */}
                <motion.div className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6'
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                >
                  <h3 className='text-lg font-semibold text-gray-900 mb-3'>Filter</h3>
                  <div className='space-y-2'>
                    <label className='flex items-center gap-3'>
                      <input
                        type='radio'
                        name='statusFilter'
                        value='all'
                        checked={statusFilter === 'all'}
                        onChange={e => setStatusFilter(e.target.value)}
                      />
                      <span className='text-sm text-gray-700'>All</span>
                    </label>
                    <label className='flex items-center gap-3'>
                      <input
                        type='radio'
                        name='statusFilter'
                        value='confirmed'
                        checked={statusFilter === 'confirmed'}
                        onChange={e => setStatusFilter(e.target.value)}
                      />
                      <span className='text-sm text-gray-700'>Confirmed</span>
                    </label>
                    <label className='flex items-center gap-3'>
                      <input
                        type='radio'
                        name='statusFilter'
                        value='pending'
                        checked={statusFilter === 'pending'}
                        onChange={e => setStatusFilter(e.target.value)}
                      />
                      <span className='text-sm text-gray-700'>Pending</span>
                    </label>
                  </div>
                </motion.div>
              </motion.div>
              )}

              {/* Lower: two columns side-by-side (hidden when section overlay is active) */}
              {!section && (
              <motion.div className='grid grid-cols-1 lg:grid-cols-2 gap-6'
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
              >
                <motion.div className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6'
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>Recent Activity</h2>
                  <ul className='space-y-3'>
                    {recentActivity.length === 0 && <li className='text-sm text-gray-500'>No recent activity.</li>}
                    {recentActivity.map((a, i) => (
                      <motion.li key={i} className='flex items-center justify-between'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                      >
                        <div>
                          <div className='font-medium text-gray-800'>{a.title}</div>
                          <div className='text-sm text-gray-500'>{a.subtitle}</div>
                        </div>
                        <div className='text-sm text-gray-500'>{a.when}</div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6'
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                >
                  {/* Placeholder panel; users table is shown via overlay when section is active */}
                  <div className='text-sm text-gray-500'>Use sidebar to open admin sections.</div>
                </motion.div>
              </motion.div>
              )}

              {/* Section panel: inline on mobile, overlay on desktop */}
              {section && (
                isMobile ? (
                  <motion.div className='rounded-2xl bg-white ring-1 ring-black/10 shadow-2xl p-4 md:p-6' initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <div className='flex items-center justify-between mb-3'>
                      <h2 className='heading-3'>{section === 'users' ? 'User Records' : section === 'cars' ? 'Cars Listing' : section === 'bookings' ? 'Booking Records' : 'Admin Section'}</h2>
                      <button className='btn' onClick={() => navigate('/dashboard', { replace: true })}>Close</button>
                    </div>
                    {section === 'users' && <AdminUsersTable />}
                    {section === 'cars' && (<div className='text-sm text-gray-500'>Cars management coming soon.</div>)}
                    {section === 'bookings' && (<div className='text-sm text-gray-500'>Bookings management coming soon.</div>)}
                  </motion.div>
                ) : (
                  <motion.div className='fixed inset-0 z-40' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className='absolute inset-0 blur-overlay' onClick={() => navigate('/dashboard', { replace: true })} />
                    <motion.div className='absolute left-1/2 top-[calc(var(--header-height)+24px)] -translate-x-1/2 w-[95%] max-w-6xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 z-50'
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <div className='p-4 md:p-6'>
                        <div className='flex items-center justify-between mb-3'>
                          <h2 className='heading-3'>{section === 'users' ? 'User Records' : section === 'cars' ? 'Cars Listing' : section === 'bookings' ? 'Booking Records' : 'Admin Section'}</h2>
                          <button className='btn' onClick={() => navigate('/dashboard', { replace: true })}>Close</button>
                        </div>
                        {section === 'users' && <AdminUsersTable />}
                        {section === 'cars' && (<div className='text-sm text-gray-500'>Cars management coming soon.</div>)}
                        {section === 'bookings' && (<div className='text-sm text-gray-500'>Bookings management coming soon.</div>)}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              )}
            </motion.div>
          )}
        </div>
      </section>
      {selected && (() => {
        const booking = (bookings||[]).find(b => String(b.id) === String(selected))
        const car = booking ? byId[booking.carId] : null
        return (
          <BookingDetailsModal booking={booking} car={car} onClose={() => setSelected(null)} />
        )
      })()}
    </PageTransition>
  )
}
