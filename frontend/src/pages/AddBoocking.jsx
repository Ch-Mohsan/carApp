import React, { useMemo, useState } from 'react'
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
  const monthMax = useMemo(() => {
    const d = new Date()
    const y = d.getFullYear()
    const m = d.getMonth()
    const lastDay = new Date(y, m + 1, 0)
    return lastDay.toISOString().slice(0,10)
  }, [])

  const [form, setForm] = useState({
    name: currentUser?.username || '',
    phone: currentUser?.phone || '',
    cnic: '',
    pickup: '',
    dropoff: '',
    date: today,
    instructions: ''
  })

  const [success, setSuccess] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!selectedCar) return
    if (!form.name.trim()) return
    if (!/^\+?[0-9\-\s]{7,15}$/.test(form.phone)) return
    if (!form.cnic.trim()) return
    if (!form.pickup.trim() || !form.dropoff.trim()) return
    // date range enforced by input min/max
    const fare = selectedCar.pricePerDay // single-day booking for now
    const payload = {
      userId: currentUser ? currentUser.id : 'guest',
      carId: selectedCar.id,
      name: form.name.trim(),
      phone: form.phone.trim(),
      cnic: form.cnic.trim(),
      pickup: form.pickup.trim(),
      dropoff: form.dropoff.trim(),
      date: form.date,
      instructions: form.instructions.trim(),
      fare
    }
    dispatch(addBooking(payload))
    dispatch(setCarStatus({ id: selectedCar.id, status: 'booked' }))
    setSuccess(true)
  }

  return (
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
                    <label className="block text-sm font-medium text-white/90">Date</label>
                    <input type="date" name="date" value={form.date} onChange={onChange} min={today} max={monthMax} className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90">Special Instructions</label>
                    <input name="instructions" value={form.instructions} onChange={onChange} className="mt-1 w-full rounded-lg border border-white/40 bg-white/20 text-white placeholder-white/70 px-3 py-2 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30" placeholder="Any notes" />
                  </div>
                </div>
                <button className="w-full p-3 bg-[#10d28e] text-white text-lg rounded-lg hover:bg-[#0fb781] shadow-md shadow-[#10d28e]/20">Confirm Booking</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddBoocking