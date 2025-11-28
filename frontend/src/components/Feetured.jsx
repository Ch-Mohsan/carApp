import React, { useState,useRef,useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAllCars } from '../feetures/carsSlices.js'

function Feeatured() {
  const storeCars = useSelector(selectAllCars)
  const slides = useMemo(() => (
    (storeCars || []).map(c => ({
      id: c.id,
      img: c.imageUrl,
      title: c.name,
      brand: c.brand,
      price: `$${c.pricePerDay}`
    }))
  ), [storeCars])
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
    <section ref={containerRef} className="w-full py-16 px-4 md:px-8 mt-[24px] md:mt-[160px] lg:mt-[300px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800">Featured Vehicles</h2>

        {/* Multi-item carousel always; shows 1/2/3 items depending on width */}
        <div className="relative overflow-hidden rounded-2xl">
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
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="w-full h-44 sm:h-52 md:h-64">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 md:p-6 flex flex-col gap-2">
                      <h3 className="text-lg md:text-2xl font-semibold text-gray-800">{s.title}</h3>
                      <p className="text-gray-500">{s.brand}</p>
                      <p className="mt-2"><span className="text-[#1089ff] font-bold">{s.price}</span><span className="text-gray-400"> /day</span></p>
                      <div className="flex gap-3 md:gap-4 mt-4">
                        <button className="px-4 py-2.5 md:px-5 md:py-3 bg-[#1089ff] hover:bg-[#0d75db] text-white rounded-md font-semibold">Book now</button>
                        <button className="px-4 py-2.5 md:px-5 md:py-3 bg-[#01d28e] hover:bg-[#00ba7d] text-white rounded-md font-semibold">Details</button>
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
        </div>
      </div>
    </section>
  )
}

export default Feeatured