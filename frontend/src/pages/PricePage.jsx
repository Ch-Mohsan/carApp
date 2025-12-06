import React, { useMemo, useState } from 'react'
import PageTransition from '../components/PageTransition'
import Alert from '../components/Alert'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAllCars, selectCarsLoading, selectCarsError } from '../feetures/carsSlices.js'
import { selectAllBookings } from '../feetures/bookingSlice.js'
import { addBooking } from '../feetures/bookingSlice.js'
import { selectCurrentUser } from '../feetures/UserSlices.js'



function PricePage() {
  const storeCars = useSelector(selectAllCars)
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const bookings = useSelector(selectAllBookings)
  const cars = useMemo(() => (
    (storeCars || []).map(c => ({
      id: c.id,
      img: c.imageUrl,
      title: c.name,
      rating: Math.round((c.rating ?? 4)),
      rentPerDay: Number(c.rentPerDay ?? c.pricePerDay ?? 0),
      status: c.status
    }))
  ), [storeCars]);
  const carsLoading = useSelector(selectCarsLoading)
  const carsError = useSelector(selectCarsError)

  const tabs = [
    { key: 'day', label: 'Per Day Package', color: 'bg-[#1089ff] text-white' },
    { key: 'lease', label: 'Per Month Package', color: 'bg-black text-white' },
  ];
  const [active, setActive] = useState('day');

  const format = (n) => `$${n.toFixed(2)}`
  const today = useMemo(() => new Date().toISOString().slice(0,10), [])
  const isBooked = (carId) => {
    const car = (storeCars || []).find(x => x.id === carId)
    const statusBooked = ((car?.status || '').trim().toLowerCase() === 'booked')
    if (statusBooked) return true
    return (bookings || []).some(b => {
      if (b.carId !== carId) return false
      const statusHolds = b.status === 'confirmed' || b.status === 'pending'
      if (!statusHolds) return false
      const start = (b.startDate || b.date || '').slice(0,10)
      const end = (b.endDate || b.date || '').slice(0,10)
      if (!start || !end) return false
      return start <= today && today <= end
    })
  }

  const [bookingTarget, setBookingTarget] = useState(null) // {carId, package}
  const [cnic, setCnic] = useState('')
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [error, setError] = useState('')
  const startDate = today
  const endDateFor = (pkg) => {
    if (pkg === 'lease') {
      const d = new Date(startDate)
      d.setDate(d.getDate() + 29)
      return d.toISOString().slice(0,10)
    }
    return startDate
  }
  const daysFor = (pkg) => pkg === 'lease' ? 30 : 1
  const fareFor = (car, pkg) => {
    if (!car) return 0
    const daily = Number(car.rentPerDay ?? car.pricePerDay ?? 0)
    return daily * daysFor(pkg)
  }
  const beginBooking = (carId, pkg) => {
    if (isBooked(carId)) return
    if (!currentUser) { window.location.href = '/login'; return }
    setError('')
    setCnic('')
    setPickup('')
    setDropoff('')
    setBookingTarget({ carId, package: pkg })
    setActive(pkg === 'lease' ? 'lease' : 'day')
  }
  const confirmQuickBooking = () => {
    if (!bookingTarget) return
    const car = cars.find(c => c.id === bookingTarget.carId)
    if (!car) { setError('Car not found.'); return }
    if (!cnic.trim()) { setError('CNIC required.'); return }
    if (!pickup.trim() || !dropoff.trim()) { setError('Pickup and dropoff locations are required.'); return }
    const payload = {
      userId: currentUser.id,
      carId: car.id,
      name: currentUser.username,
      phone: currentUser.phone,
      cnic: cnic.trim(),
      pickup: pickup.trim(),
      dropoff: dropoff.trim(),
      startDate: startDate,
      endDate: endDateFor(bookingTarget.package),
      instructions: bookingTarget.package === 'lease' ? 'Monthly package' : 'Daily package',
      fare: fareFor(car, bookingTarget.package)
    }
    dispatch(addBooking(payload))
    toast.success('Booking confirmed')
    setBookingTarget(null)
    setCnic('')
    setPickup('')
    setDropoff('')
    navigate('/bookings')
  }

  return (
    <PageTransition>
    <section className="w-full px-4 md:px-8 py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {cars.map((c) => (
                <div key={c.id} className="flex items-center gap-6">
                  <div className="w-40 h-28 rounded-md overflow-hidden shadow-sm">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{c.title}</h3>
                    <div className="mt-2 text-sm text-gray-600">rated:
                      <span className="inline-flex items-center ml-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={`mx-0.5 ${i < c.rating ? 'text-[#01d28e]' : 'text-gray-300'}`}>★</span>
                        ))}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-700">Daily: <span className="font-semibold text-[#1089ff]">{format(c.rentPerDay)}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {/* Tabs header (visual only, columns remain visible) */}
            <div className="flex rounded-md  overflow-hidden">
              {tabs.map((t) => (
                <div
                  key={t.key}
                  className={`flex-1 py-3 px-5 text-center font-semibold text-md tracking-wide ${t.color}`}
                >
                  {t.label}
                </div>
              ))}
            </div>

            {/* Status banners */}
            {carsLoading && <Alert type='info' className='mb-4'>Loading cars…</Alert>}
            {carsError && !carsLoading && <Alert type='error' className='mb-4'>{String(carsError)}</Alert>}
            {!carsLoading && !carsError && cars.length === 0 && (
              <Alert type='warning' className='mb-4'>No cars available right now.</Alert>
            )}

            {/* Per-car rows: each car has 2 pricing columns (day, month) */}
            <div className="mt-4 space-y-5">
              {cars.map((c) => (
                <div key={`row-${c.id}`} className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {/* Day column */}
                  <div className="group px-4 py-4 rounded-md shadow-sm bg-gray-50 transition-colors md:hover:bg-[#01d28e]/90 md:active:bg-[#01d28e]/90 min-h-36">
                    <div className="text-[#1089ff] text-xl font-bold flex items-baseline gap-2">{format(c.rentPerDay)}<span className="text-gray-500 font-normal">/per day</span></div>
                    <div className="text-gray-600 text-sm">One-day package</div>
                    <button
                      onClick={() => beginBooking(c.id,'day')}
                      disabled={isBooked(c.id)}
                      className={`mt-3 btn btn-primary opacity-0 md:group-hover:opacity-100 ${isBooked(c.id) ? '!bg-gray-300 !text-gray-500 cursor-not-allowed !border-gray-300' : ''}`}
                    >{isBooked(c.id) ? 'Unavailable' : 'Book Day'}</button>
                  </div>
                  {/* Month column */}
                  <div className="group px-4 py-4 rounded-md shadow-sm bg-gray-50 transition-colors md:hover:bg-[#01d28e]/90 md:active:bg-[#01d28e]/90 min-h-36">
                    <div className="text-[#1089ff] text-xl font-bold flex items-baseline gap-2">{format(c.rentPerDay * 30)}<span className="text-gray-500 font-normal">/per month</span></div>
                    <div className="text-gray-600 text-sm">30-day package</div>
                    <button
                      onClick={() => beginBooking(c.id,'lease')}
                      disabled={isBooked(c.id)}
                      className={`mt-3 btn btn-primary opacity-0 md:group-hover:opacity-100 ${isBooked(c.id) ? '!bg-gray-300 !text-gray-500 cursor-not-allowed !border-gray-300' : ''}`}
                    >{isBooked(c.id) ? 'Unavailable' : 'Book Month'}</button>
                  </div>
                </div>
              ))}
            </div>
            {bookingTarget && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop with lighter white blur */}
                <div
                  className="absolute inset-0 bg-white/70 backdrop-blur-sm"
                  onClick={() => { setBookingTarget(null); setCnic(''); }}
                />
                {/* Modal Card - white design */}
                <div
                  role="dialog"
                  aria-modal="true"
                  className="relative z-10 w-[90vw] md:w-auto max-w-xl md:max-w-2xl mx-4 md:mx-6 rounded-2xl bg-white ring-1 ring-gray-200 shadow-2xl text-black max-h-[80vh] overflow-auto md:max-h-none md:overflow-visible"
                >
                  <div className="flex items-center justify-between px-4 md:px-6 pt-4 md:pt-6">
                    <h3 className="text-xl font-bold">Quick Booking</h3>
                    <button
                      onClick={() => { setBookingTarget(null); setCnic(''); }}
                      className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 shadow"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-4">
                    {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</div>}
                    <div className="text-sm text-gray-700 flex flex-col gap-1">
                      <span>Car: {cars.find(c => c.id === bookingTarget.carId)?.title}</span>
                      <span>Package: {bookingTarget.package === 'lease' ? 'Monthly (30 days)' : 'Single Day'}</span>
                      {currentUser && (
                        <span>Customer: {currentUser.username} ({currentUser.phone})</span>
                      )}
                      <span>Start: {startDate}</span>
                      <span>End: {endDateFor(bookingTarget.package)}</span>
                      <span>Fare: <strong className="text-[#1089ff]">{format(fareFor(cars.find(c=>c.id===bookingTarget.carId), bookingTarget.package))}</strong></span>
                    </div>
                    {!currentUser && (
                      <div className="text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded px-3 py-2">Login required before booking.</div>
                    )}
                    {currentUser && (
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                            <input
                              value={currentUser.username}
                              readOnly
                              className="mt-1 w-full rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 px-3 py-2 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                              value={currentUser.phone}
                              readOnly
                              className="mt-1 w-full rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 px-3 py-2 outline-none"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                            <input
                              value={pickup}
                              onChange={e=>setPickup(e.target.value)}
                              placeholder="City / Address"
                              className="mt-1 w-full rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 px-3 py-2 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Dropoff Location</label>
                            <input
                              value={dropoff}
                              onChange={e=>setDropoff(e.target.value)}
                              placeholder="City / Address"
                              className="mt-1 w-full rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 px-3 py-2 outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">CNIC</label>
                          <input
                            value={cnic}
                            onChange={e=>setCnic(e.target.value)}
                            placeholder="XXXXX-XXXXXXX-X"
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 px-3 py-2 outline-none"
                          />
                        </div>
                        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-end gap-2 md:gap-3">
                          <button
                            onClick={() => { setBookingTarget(null); setCnic(''); }}
                            className="px-5 py-2 rounded-md bg-[#1089ff] text-white font-semibold hover:bg-[#0d75db]"
                          >Cancel</button>
                          <button
                            onClick={confirmQuickBooking}
                            disabled={!cnic.trim() || !pickup.trim() || !dropoff.trim()}
                            className={`px-5 py-2 rounded-md font-semibold ${(!cnic.trim() || !pickup.trim() || !dropoff.trim()) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#01d28e] text-black hover:brightness-95'}`}
                          >Confirm</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </PageTransition>
  )
}

export default PricePage