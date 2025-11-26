import React, { useEffect, useRef, useState } from 'react'

// Simple carousel with 3 car cards using images from public/images
// Features: dots navigation, auto-advance, and scroll-driven advance when in view.

const slides = [
  {
    id: 1,
    title: 'Mercedes Grand Sedan',
    brand: 'Cheverolet',
    price: '$500',
    img: '/images/car-1.jpg',
  },
  {
    id: 2,
    title: 'Mercedes Grand Sedan',
    brand: 'Cheverolet',
    price: '$500',
    img: '/images/car-3.jpg',
  },
  {
    id: 3,
    title: 'Mercedes Grand Sedan',
    brand: 'Cheverolet',
    price: '$500',
    img: '/images/car-4.jpg',
  },
]

function Feeatured() {
  const [index, setIndex] = useState(slides.length) // start in the middle for seamless loop
  const containerRef = useRef(null)
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const lastAdvanceAt = useRef(0)
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === 'undefined') return 1
    const w = window.innerWidth
    if (w >= 1024) return 3
    if (w >= 768) return 2
    return 1
  })

  // build extended slides to allow infinite loop while showing 3 at once
  const extendedSlides = [...slides, ...slides, ...slides]

  const advance = (dir = 1) =>
    setIndex((i) => {
      const len = extendedSlides.length
      return (i + dir + len) % len
    })

  // Track viewport width to set visibleCount (1/2/3)
  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth
      setVisibleCount(w >= 1024 ? 3 : w >= 768 ? 2 : 1)
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
    <section ref={containerRef} className="w-full py-16 px-4 md:px-8">
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
                <div className="bg-white rounded-xl shadow-xl overflow-hidden mx-3">
                  <div className="w-full h-56 md:h-64">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{s.title}</h3>
                    <p className="text-gray-500">{s.brand}</p>
                    <p className="mt-2"><span className="text-[#1089ff] font-bold">{s.price}</span><span className="text-gray-400"> /day</span></p>
                    <div className="flex gap-4 mt-4">
                      <button className="px-5 py-3 bg-[#1089ff] hover:bg-[#0d75db] text-white rounded-md font-semibold">Book now</button>
                      <button className="px-5 py-3 bg-[#01d28e] hover:bg-[#00ba7d] text-white rounded-md font-semibold">Details</button>
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
