import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAllCars } from '../feetures/carsSlices.js'
import { selectAllBookings } from '../feetures/bookingSlice.js'
import { selectCurrentUser } from '../feetures/UserSlices.js'

function Hero() {
  const cars = useSelector(selectAllCars)
  const bookings = useSelector(selectAllBookings)
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()

  const today = useMemo(() => new Date().toISOString().slice(0,10), [])
  const [form, setForm] = useState({ pickup: '', dropoff: '', start: today, end: today, category: 'all' })
  const [error, setError] = useState('')

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const categories = useMemo(() => {
    const set = new Set((cars||[]).map(c => c.category).filter(Boolean))
    return ['all', ...Array.from(set)]
  }, [cars])

  const days = useMemo(() => {
    const s = new Date(form.start)
    const e = new Date(form.end)
    const diff = Math.floor((e - s)/(1000*60*60*24))
    return Math.max(1, diff+1)
  }, [form.start, form.end])

  const available = useMemo(() => {
    return (cars||[]).filter(c => {
      if (form.category !== 'all' && c.category !== form.category) return false
      const active = (bookings||[]).some(b => b.carId === c.id && b.status === 'pending' && (b.endDate||b.date) >= form.start)
      return !active
    })
  }, [cars, bookings, form.start, form.category])

  const fareRange = useMemo(() => {
    if (!available.length) return null
    const rates = available.map(c => Number(c.rentPerDay ?? c.pricePerDay ?? 0))
    const min = Math.min(...rates)
    const max = Math.max(...rates)
    return { min: min*days, max: max*days }
  }, [available, days])

  const onSearch = (e) => {
    e.preventDefault()
    setError('')
    if (new Date(form.end) < new Date(form.start)) { setError('End date cannot be before start.'); return }
    navigate(`/cars?pickup=${encodeURIComponent(form.pickup)}&dropoff=${encodeURIComponent(form.dropoff)}&start=${form.start}&end=${form.end}&category=${form.category}`)
  }

  return (
    <section className="hero-section flex md:justify-center flex-col px-4">
      <div className="w-full hero-content-padding flex flex-col text-center items-center justify-center text-white py-16 md:py-24 px-4">
        <h1 className="font-extrabold text-[40px] md:text-[52px] mb-4 leading-tight">Fast & Easy Way To Rent A Car</h1>
        <p className="text-lg max-w-2xl mb-4">Find the right vehicle, filter by category, and book instantly with transparent pricing.</p>
        <p className="text-lg"><span className="text-gray-300">_____</span> Easy Steps for renting a car</p>
      </div>

      <div className="hero-panels md:flex justify-center px-4 md:px-6">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-start mx-auto gap-8">
          {/* Redesigned Booking/Search Panel */}
          <div className="flex-1 rounded-2xl bg-[#1089ff] p-6 md:p-7 shadow-xl text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_top_left,#fff,transparent_70%)]" />
            <h2 className="relative text-xl md:text-2xl font-bold mb-4">Plan Your Trip</h2>
            {error && <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded px-3 py-2">{error}</div>}
            <form onSubmit={onSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-white/90 text-xs uppercase tracking-wider">Pickup Location</label>
                  <input name="pickup" value={form.pickup} onChange={onChange} placeholder="City / Airport" className="w-full rounded-md bg-white text-gray-800 placeholder-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-[#10d28e]/40 focus:border-[#10d28e] border border-transparent transition" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-white/90 text-xs uppercase tracking-wider">Dropoff Location</label>
                  <input name="dropoff" value={form.dropoff} onChange={onChange} placeholder="City / Airport" className="w-full rounded-md bg-white text-gray-800 placeholder-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-[#10d28e]/40 focus:border-[#10d28e] border border-transparent transition" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-white/90 text-xs uppercase tracking-wider">Start Date</label>
                  <input type="date" name="start" value={form.start} min={today} onChange={onChange} className="w-full rounded-md bg-white text-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-[#10d28e]/40 focus:border-[#10d28e] border border-transparent transition" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-white/90 text-xs uppercase tracking-wider">End Date</label>
                  <input type="date" name="end" value={form.end} min={form.start} onChange={onChange} className="w-full rounded-md bg-white text-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-[#10d28e]/40 focus:border-[#10d28e] border border-transparent transition" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-white/90 text-xs uppercase tracking-wider">Category</label>
                  <select name="category" value={form.category} onChange={onChange} className="w-full rounded-md bg-white text-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-[#10d28e]/40 focus:border-[#10d28e] border border-transparent transition">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-white/90 text-xs uppercase tracking-wider">Summary</label>
                  <div className="w-full rounded-md bg-[#0d75db]/20 border border-white/20 text-white px-3 py-2 text-sm flex flex-col gap-1">
                    <span>{days} day{days>1?'s':''}</span>
                    <span>{available.length} car{available.length!==1?'s':''} available</span>
                    {fareRange && <span className="text-[#10d28e] font-semibold">Est: ${fareRange.min.toFixed(2)} - ${fareRange.max.toFixed(2)}</span>}
                  </div>
                </div>
              </div>
              <button className="w-full px-4 py-3 md:py-4 text-white bg-[#10d28e] hover:bg-[#0fb781] rounded font-semibold text-base transition-colors shadow-lg shadow-[#10d28e]/30">Search Cars</button>
            </form>
            {currentUser && <p className="mt-3 text-xs text-white/80">Logged in as {currentUser.username}</p>}
          </div>

          {/* Info / Steps Panel */}
          <div className="flex-1 rounded-2xl bg-white shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Better Way to Rent Your Perfect Cars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[{
                icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#1089ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
                text: 'Choose Pickup Location'
              }, {
                icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#1089ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
                text: 'Select the Best Deal'
              }, {
                icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#1089ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>),
                text: 'Reserve Your Rental Car'
              }].map((s,i)=>(
                <div key={i} className="flex flex-col items-center gap-4 text-center">
                  <div className="bg-[#1089ff1a] p-4 rounded-full">{s.icon}</div>
                  <p className="font-semibold text-gray-700 text-sm md:text-base leading-snug">{s.text}</p>
                </div>
              ))}
            </div>
            <button onClick={()=>navigate('/price')} className="mt-6 px-8 py-3 md:py-4 text-center bg-[#1089ff] hover:bg-[#0d75db] text-white rounded font-semibold text-base w-fit transition-colors">View Pricing</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero