import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllCars, fetchCarsThunk } from '../feetures/carsSlices.js'
import { fetchAllBookingsThunk } from '../feetures/bookingSlice.js'

// Lightweight landing page without global layout (no Navbar/Footer/Hero from MainLayout)
// Theme: primary #1089ff, accent #01d28e, dark overlays, glass touches.
export default function Landing() {
  const dispatch = useDispatch()
  const storeCars = useSelector(selectAllCars)
  const cars = useMemo(() => (storeCars || []).slice(0, 6).map(c => ({
    id: c.id,
    img: c.imageURL || c.imageUrl || c.img,
    title: c.name,
    brand: c.brand,
    price: `$${c.pricePerDay}`
  })), [storeCars])

  // Ensure cars/bookings are available for this page (no layout here)
  useEffect(() => {
    if (!storeCars || storeCars.length === 0) {
      dispatch(fetchCarsThunk())
    }
    dispatch(fetchAllBookingsThunk())
  }, [])

  return (
    <div className='min-h-screen w-full flex flex-col bg-white text-black'>
      {/* Poster / Hero */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className='relative w-full flex items-center justify-center min-h-[88vh] md:min-h-[92vh] lg:min-h-screen px-6 md:px-10 overflow-hidden'
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 40%, rgba(16,137,255,0.25) 100%), url(/images/landing.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='absolute inset-0 pointer-events-none mix-blend-multiply' />
        <div className='relative max-w-4xl mx-auto text-center space-y-6'>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='heading-1'
          >
          <span className='text-[#01d28e]'>  Drive Your Next</span> <span className='text-[#1089ff]'>Experience</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className='lead max-w-2xl mx-auto'
          >
            Premium, sport, and eco-friendly cars ready when you are. Seamless booking, honest pricing, flexible plans.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.18 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-2'
          >
            <Link to='/login' className='btn btn-primary rounded-lg px-8 py-3 w-full sm:w-auto '>Login</Link>
            <Link to='/login?mode=register' className='btn btn-secondary rounded-lg px-8 py-3 w-full sm:w-auto '>Register</Link>
          </motion.div>
        </div>
      </motion.section>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10'>
            <div>
              <h2 className='text-3xl md:text-4xl font-bold tracking-tight mt-5'>Popular Choices</h2>
              <p className='text-gray-600 mt-2 max-w-md'>Hand‑picked vehicles balancing performance, comfort, and value.</p>
            </div>
            {/* <Link to='/cars' className='inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1089ff] text-white font-medium hover:bg-[#0d75db] transition-colors shadow-md'>
              Explore Fleet
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-5 w-5'><path d='M5 12h14'/><path d='M13 5l7 7-7 7'/></svg>
            </Link> */}
          </div>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
          >
            {cars.map(c => (
              <motion.div
                key={c.id}
                className='group rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-shadow'
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <div className='h-48 md:h-56 w-full overflow-hidden'>
                  <img src={c.img} alt={c.title} className='w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500' />
                </div>
                <div className='p-5'>
                  <h3 className='text-xl font-semibold text-gray-800'>{c.title}</h3>
                  <p className='text-sm text-gray-500 mt-1'>{c.brand}</p>
                  <div className='mt-3 flex items-baseline gap-1'>
                    <span className='text-[#1089ff] font-bold'>{c.price}</span>
                    <span className='text-gray-400 text-sm'>/day</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      {/* Compact CTA footer substitute */}
      {/* <section className='px-6 md:px-10 py-10 bg-gradient-to-r from-[#1089ff] to-[#01d28e] text-white'>
        <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6'>
          <div className='text-center lg:text-left'>
            <h3 className='heading-3'>Ready to start your journey?</h3>
            <p className='paragraph mt-2 max-w-lg'>Join and unlock flexible pricing, priority support, and curated recommendations tailored to how you drive.</p>
          </div>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link to='/login' className='px-7 py-3 rounded-full bg-white text-[#1089ff] font-semibold hover:bg-white/90 transition-colors'>Login</Link>
            <Link to='/login?mode=register' className='px-7 py-3 rounded-full bg-black/30 backdrop-blur-sm text-white font-semibold hover:bg-black/40 transition-colors'>Register</Link>
          </div>
        </div>
      </section> */}
    </div>
  )
}
