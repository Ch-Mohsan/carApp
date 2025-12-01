import React, { useMemo, useState } from 'react'
import PageTransition from '../components/PageTransition'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { selectAllCars } from '../feetures/carsSlices.js'
import { selectCurrentUser } from '../feetures/UserSlices.js'
import { addBooking } from '../feetures/bookingSlice.js'
import { setCarStatus } from '../feetures/carsSlices.js'

function AddBoocking() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const carIdParam = params.get('carId')
  const cars = useSelector(selectAllCars)
  const currentUser = useSelector(selectCurrentUser)

  const selectedCar = useMemo(() => {
    const id = carIdParam
    return (cars || []).find(c => c.id === id) || (cars || []).find(c => String(c.id) === String(id)) || null
  }, [cars, carIdParam])

  const today = useMemo(() => {
    const d = new Date()
    return d.toISOString().slice(0,10)
  }, [])
  // Allow bookings across months; we only enforce a minimum of today.

  const [form, setForm] = useState({
    name: currentUser?.username || '',
    phone: currentUser?.phone || '',
    cnic: '',
    pickup: '',
    dropoff: '',
    startDate: today,
    endDate: today,
    instructions: ''
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const days = useMemo(() => {
    const s = new Date(form.startDate)
    const e = new Date(form.endDate)
    const ms = e.getTime() - s.getTime()
    const diff = Math.floor(ms / (1000*60*60*24))
    return Math.max(1, diff + 1)
  }, [form.startDate, form.endDate])

  const computedFare = useMemo(() => {
    if (!selectedCar) return 0
    const rate = Number(selectedCar.rentPerDay ?? selectedCar.pricePerDay ?? 0)
    return days * rate
  }, [days, selectedCar])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!selectedCar) {toast.warn('Please select a car to book.'); return }
    if (!form.name.trim()) {toast.warn('Customer name is required.'); return }
    // Relaxed phone validation to accept common formats, and it's read-only from user profile
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone)) {toast.warn('Phone number format looks invalid.'); return }
    if (!form.cnic.trim()) {toast.warn('CNIC is required.'); return }
    if (!form.pickup.trim() || !form.dropoff.trim()) {toast.warn('Pickup and dropoff locations are required.'); return }
    if (new Date(form.endDate) < new Date(form.startDate)) {toast.warn('Return date cannot be before pickup date.'); return }
    // date range enforced by input min/max
    const payload = {
      userId: currentUser ? currentUser.id : 'guest',
      carId: selectedCar.id,
      name: form.name.trim(),
      phone: form.phone.trim(),
      cnic: form.cnic.trim(),
      pickup: form.pickup.trim(),
      dropoff: form.dropoff.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      instructions: form.instructions.trim(),
      fare: computedFare
    }
    dispatch(addBooking(payload))
    dispatch(setCarStatus({ id: selectedCar.id, status: 'booked' }))
    setError('')
    toast.success('Booking confirmed')
    navigate('/bookings')
  }

  return (
    <PageTransition>
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4 pb-10"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.35) 100%), url(/images/car-5.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-6xl">
        <div className="rounded-2xl bg-transparent backdrop-blur-md shadow-xl ring-1 ring-white/20 p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Selected Car Card */}
            <div className="rounded-xl overflow-hidden ring-1 ring-white/20 bg-white/10">
              {selectedCar ? (
                <>
                  <div className="relative w-full h-56 md:h-72">
                    <img src={selectedCar.imageUrl} alt={selectedCar.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-white">{selectedCar.name}</h3>
                    <p className="text-white/80">{selectedCar.brand}</p>
                    <p className="mt-2"><span className="text-[#01d28e] font-bold">${selectedCar.pricePerDay}</span><span className="text-white/70"> /day</span></p>
                  </div>
                </>
              ) : (
                <div className="p-6">
                  <p className="text-white/90">No car selected. Please choose a car from the fleet.</p>
                </div>
              )}
            </div>

            {/* Right: Booking Form */}
            <div className="rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-5">
              <h2 className="text-2xl font-bold text-white mb-4">Add Booking</h2>
              {success && (
                <div className="mb-4 rounded-lg bg-[#10d28e]/15 text-[#10d28e] border border-[#10d28e]/30 px-4 py-3">
                  Booking confirmed. <button onClick={() => navigate('/bookings')} className="underline">View bookings</button>
                </div>
              )}
              {error && (
                <div className="mb-4 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-3">
                  {error}
                </div>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90">Customer Name</label>
                  <input name="name" value={form.name} readOnly className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90">Phone</label>
                  <input name="phone" value={form.phone} readOnly className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none" placeholder="+1 555 123 4567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90">CNIC</label>
                  <input name="cnic" value={form.cnic} onChange={onChange} className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30" placeholder="XXXXX-XXXXXXX-X" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90">Pickup Location</label>
                    <input name="pickup" value={form.pickup} onChange={onChange} className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30" placeholder="City / Address" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90">Dropoff Location</label>
                    <input name="dropoff" value={form.dropoff} onChange={onChange} className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30" placeholder="City / Address" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90">Pickup Date</label>
                    <input type="date" name="startDate" value={form.startDate} onChange={onChange} min={today} className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90">Return Date</label>
                    <input type="date" name="endDate" value={form.endDate} onChange={onChange} min={form.startDate || today} className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90">Special Instructions</label>
                    <input name="instructions" value={form.instructions} onChange={onChange} className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30" placeholder="Any notes" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90">Estimated Fare</label>
                    <input readOnly value={`$${computedFare} (${days} day${days>1?'s':''})`} className="mt-1 w-full rounded-lg border border-white/40 bg-white/10 text-white px-3 py-2 outline-none" />
                  </div>
                </div>
                <button className="w-full p-3 bg-[#10d28e] text-white text-lg rounded-lg hover:bg-[#0fb781] shadow-md shadow-[#10d28e]/20">Confirm Booking</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </PageTransition>
  )
}

export default AddBoocking