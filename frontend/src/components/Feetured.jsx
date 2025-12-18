import React, { useState,useRef,useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewFadeUp } from '../components/animations'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllCars } from '../feetures/carsSlices.js'
import { selectAllBookings } from '../feetures/bookingSlice.js'

function Feeatured() {
  const storeCars = useSelector(selectAllCars)
  const bookings = useSelector(selectAllBookings)
  const today = useMemo(() => new Date().toISOString().slice(0,10), [])
  const slides = useMemo(() => (
    (storeCars || []).map(c => {
      const statusBooked = ((c.status || '').trim().toLowerCase() === 'booked')
      const bookedByRange = (bookings || []).some(b => {
        if (b.carId !== c.id) return false
        const statusHolds = b.status === 'confirmed' || b.status === 'pending'
        if (!statusHolds) return false
        const start = (b.startDate || b.date || '').slice(0,10)
        const end = (b.endDate || b.date || '').slice(0,10)
        if (!start || !end) return false
        return start <= today && today <= end
      })
      const booked = statusBooked || bookedByRange
      return {
        id: c.id,
        img: c.imageURL || c.imageUrl || c.img,
        title: c.name,
        brand: c.brand,
        price: `$${c.pricePerDay}`,
        booked
      }
    })
  ), [storeCars, bookings, today])
  const [index, setIndex] = useState(slides.length)
  
  // start in the middle for seamless loop
  const containerRef = useRef(null)
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const lastAdvanceAt = useRef(0)
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === 'undefined') return 2
    const w = window.innerWidth
    if (w >= 1024) return 3
    return 2 // show two cards on mobile & tablet
  })

  // build extended slides to allow infinite loop while showing 3 at once
  const extendedSlides = [...slides, ...slides, ...slides]

  const advance = (dir = 1) =>
    setIndex((i) => {
      const len = extendedSlides.length
      if (len === 0) return i
      return (i + dir + len) % len
    })

  // Track viewport width to set visibleCount (1/2/3)
  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth
      setVisibleCount(w >= 1024 ? 3 : 2)
    }
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Autoplay and scroll-driven advance when component is in viewport
  useEffect(() => {
    const autoplay = setInterval(() => advance(1), 5000)

    const onScroll = () => {
      const now = Date.now()
      if (now - lastAdvanceAt.current < 450) return // throttle
      lastAdvanceAt.current = now

      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15
      if (!inView) return

      const dir = window.scrollY > lastScrollY.current ? 1 : -1
      lastScrollY.current = window.scrollY
      advance(dir)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearInterval(autoplay)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <motion.section ref={containerRef} className="w-full py-16 px-4 md:px-8 mt-[24px] md:mt-[160px] lg:mt-[300px]"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800" variants={fadeUp}>Featured Vehicles</motion.h2>

        {/* Multi-item carousel always; shows 1/2/3 items depending on width */}
        <motion.div className="relative overflow-hidden rounded-2xl" variants={viewFadeUp}>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
          >
            {extendedSlides.map((s, i) => (
              <div
                key={`${s.id}-${i}`}
                className="flex-shrink-0"
                style={{ flex: `0 0 calc(${100 / visibleCount}% )` }}
              >
                <div className="px-2 md:px-3">
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden relative">
                    <div className="w-full h-44 sm:h-52 md:h-64 relative">
                      <img src={s.img} alt={s.title} className={`w-full h-full object-cover ${s.booked ? 'blur-[2px] brightness-75' : ''}`} />
                      {s.booked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="px-3 py-1 rounded-full bg-black/60 text-white text-sm font-semibold">Booked</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 md:p-6 flex flex-col gap-2">
                      <h3 className="text-lg md:text-2xl font-semibold text-gray-800">{s.title}</h3>
                      <p className="text-gray-500">{s.brand}</p>
                      <p className="mt-2"><span className="text-[#1089ff] font-bold">{s.price}</span><span className="text-gray-400"> /day</span></p>
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
                </div>
              </div>
            ))}
          </div>

          {/* Dots navigation (based on original slides) */}
          <div className="flex items-center justify-center gap-3 mt-6" aria-label="Carousel pagination">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(slides.length + i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-3 w-3 rounded-full transition-all ${((index % slides.length) === i) ? 'bg-[#1089ff] w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Feeatured