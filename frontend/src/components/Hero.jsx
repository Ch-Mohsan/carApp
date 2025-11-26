import React from 'react'

function Hero() {
  return (
    <section className="hero-section flex md:justify-center flex-col px-4  ">
      {/* Hero Content */}
      <div className="w-full hero-content-padding flex flex-col text-center items-center justify-center text-white py-16 md:py-24 px-4">
        <h1 className="font-extrabold text-[40px] md:text-[52px] mb-4 leading-tight">
          Fast & Easy Way To Rent A Car
        </h1>
        <p className="text-lg max-w-2xl mb-4">
          A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts
        </p>
        <p className="text-lg">
          <span className="text-gray-300">_____</span> Easy Steps for renting a car
        </p>
      </div>

      {/* Overlapping Section with Both Panels - use CSS-controlled positioning */}
      <div className="hero-panels md:flex justify-center px-4 md:px-6">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-start mx-auto">
          {/* Left Panel - Booking Form */}
          <div className="request-form">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Make your trip</h2>

            <div className="flex flex-col gap-2">
              <label className="text-white text-xs uppercase tracking-wider font-medium">Pick-up location</label>
              <input className="w-full outline-none border border-white bg-white/20 rounded px-3 py-2 text-white placeholder-white/70" type="text" placeholder="City, Airport, Station, etc" />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-white text-xs uppercase tracking-wider font-medium">Drop-off location</label>
              <input className="w-full outline-none border border-white bg-white/20 rounded px-3 py-2 text-white placeholder-white/70" type="text" placeholder="City, Airport, Station, etc" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs uppercase tracking-wider font-medium">Pick-up date</label>
                <input type="text" placeholder="Date" className="border border-white bg-white/20 rounded px-3 py-2 text-white placeholder-white/70 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs uppercase tracking-wider font-medium">Drop-off date</label>
                <input type="text" placeholder="Date" className="border border-white bg-white/20 rounded px-3 py-2 text-white placeholder-white/70 outline-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-white text-xs uppercase tracking-wider font-medium">Pick up Time</label>
              <input type="text" placeholder="Time" className="border border-white bg-white/20 rounded px-3 py-2 text-white placeholder-white/70 outline-none" />
            </div>

            <button className="w-full px-4 py-3 md:py-4 text-white bg-[#01d28e] hover:bg-[#00ba7d] rounded font-semibold text-base transition-colors mt-4">Rent A Car Now</button>
          </div>

          {/* Right Panel - Info Card */}
          <div className="services-wrap">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Better Way to Rent Your Perfect Cars</h2>

            <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="bg-[#1089ff1a] p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#1089ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-700 text-sm md:text-base leading-snug">Choose Your Pickup<br />Location</p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="bg-[#1089ff1a] p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#1089ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-700 text-sm md:text-base">Select the Best Deal</p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="bg-[#1089ff1a] p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#1089ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-700 text-sm md:text-base leading-snug">Reserve Your Rental<br />Car</p>
              </div>
            </div>

            <button className="mt-6 px-8 py-3 md:py-4 text-center bg-[#1089ff] hover:bg-[#0d75db] text-white rounded font-semibold text-base w-fit transition-colors">Reserve Your Perfect Car</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero