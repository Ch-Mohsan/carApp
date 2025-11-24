import React from 'react'

function Hero() {
  return (
    <section className="hero-section relative w-full">
      {/* Top hero text, centered over background from MainLayout */}
      <div className="w-full min-h-[520px] flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <h1 className="font-extrabold text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] leading-tight mb-4">
          Fast &amp; Easy Way To Rent A Car
        </h1>
        <p className="hidden md:block text-base md:text-lg max-w-2xl">
          A small river named Duden flows by their place and supplies it with the necessary regelialia.
          It is a paradisematic country, in which roasted parts
        </p>
        <p className="md:hidden text-base px-4">
          A small river named Duden flows by their place and supplies it with the necessary regelialia.
          It is a paradisematic country, in which roasted parts
        </p>
        <p className="mt-5 text-sm sm:text-base tracking-wide flex items-center gap-3">
          <span className="inline-block w-14 h-[2px] bg-white/70" />
          <span>EASY STEPS FOR RENTING A CAR</span>
        </p>
      </div>

      {/* Overlapping panels: left booking panel + right content card */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-[7rem] sm:-bottom-28 lg:-bottom-32 z-20 w-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left: blue booking box (fixed width on desktop, full width on small) */}
          <div className="w-full lg:max-w-sm bg-[#1089ff] text-white rounded-lg shadow-2xl px-6 sm:px-7 lg:px-8 py-8 sm:py-9 lg:py-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Make your trip</h2>
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold uppercase mb-2 tracking-wide">Pick-up location</label>
                <input
                  className="w-full bg-white/10 rounded px-3 py-2.5 text-sm placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70"
                  placeholder="City, Airport, Station, etc"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase mb-2 tracking-wide">Drop-off location</label>
                <input
                  className="w-full bg-white/10 rounded px-3 py-2.5 text-sm placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70"
                  placeholder="City, Airport, Station, etc"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold uppercase mb-2 tracking-wide">Pick-up date</label>
                  <input
                    className="w-full bg-white/10 rounded px-3 py-2.5 text-sm placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70"
                    placeholder="Date"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold uppercase mb-2 tracking-wide">Drop-off date</label>
                  <input
                    className="w-full bg-white/10 rounded px-3 py-2.5 text-sm placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70"
                    placeholder="Date"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="block text-xs font-semibold uppercase mb-2 tracking-wide">Pick-up time</label>
                <input
                  className="w-full bg-white/10 rounded px-3 py-2.5 text-sm placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70"
                  placeholder="Time"
                />
              </div>

              <button className="mt-4 w-full bg-[#01d28e] hover:bg-[#00b979] transition-colors duration-200 py-3.5 rounded font-semibold text-sm sm:text-base">
                Rent A Car Now
              </button>
            </div>
          </div>

          {/* Right: white services card (flex-grow to fill remaining width) */}
          <div className="w-full bg-white rounded-lg shadow-2xl px-6 sm:px-10 lg:px-12 py-8 sm:py-9 lg:py-10 flex flex-col justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Better Way to Rent Your Perfect Cars
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <span className="flaticon-route text-3xl text-[#1089ff]" />
                </div>
                <p className="text-sm font-medium text-gray-800 leading-snug">Choose Your Pickup Location</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <span className="flaticon-handshake text-3xl text-[#1089ff]" />
                </div>
                <p className="text-sm font-medium text-gray-800 leading-snug">Select the Best Deal</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <span className="flaticon-rent text-3xl text-[#1089ff]" />
                </div>
                <p className="text-sm font-medium text-gray-800 leading-snug">Reserve Your Rental Car</p>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start mt-2">
              <button className="inline-flex items-center justify-center bg-[#1089ff] hover:bg-[#0d75e0] text-white font-semibold py-3 px-8 rounded text-sm sm:text-base transition-colors duration-200">
                Reserve Your Perfect Car
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero