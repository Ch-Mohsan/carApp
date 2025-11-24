import React from 'react'

function Hero() {
  return (
    <section className="hero-section relative">
      <div className="w-full min-h-[680px] flex flex-col text-center items-center justify-center text-white py-24 hero-content-padding">
        <h1 className="font-extrabold text-[44px] mb-4 leading-12">Fast & Easy Way To Rent A Car</h1>
        <p className="hidden md:block text-lg max-w-2xl">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts</p>
        <p className="md:hidden text-lg px-8">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts</p>
        <p className="text-lg mt-4"><span>_____</span>Easy Steps for renting a car</p>
      </div>

      {/* Overlapping panels: left booking panel + right content card. */}
      <div className="absolute hero-panels z-20 flex items-start gap-6 px-4 md:px-0 " >
        <div className="request-form shadow-xl text-white">
          <h2 className="text-xl font-bold mb-4">Make your trip</h2>
          <div className="space-y-4">
            <input className="w-full bg-white/10 rounded px-3 py-2 placeholder-white/70" placeholder="City, Airport, Station, etc" />
            <input className="w-full bg-white/10 rounded px-3 py-2 placeholder-white/70" placeholder="Drop-off location" />
            <div className="flex gap-3">
              <input className="flex-1 bg-white/10 rounded px-3 py-2" placeholder="Pick-up date" />
              <input className="flex-1 bg-white/10 rounded px-3 py-2" placeholder="Drop-off date" />
            </div>
            <button className="w-full bg-[#01d28e] py-3 rounded font-semibold mt-2">Rent A Car Now</button>
          </div>
        </div>

        <div className="services-wrap">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Better Way to Rent Your Perfect Cars
          </h2>

          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col md:flex-row justify-between w-full gap-8 text-center">
              <div className="flex-1">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border border-blue-100 flex items-center justify-center">
                  <span className="text-blue-500 text-3xl">📍</span>
                </div>
                <h3 className="font-semibold text-gray-800">Choose Your Pickup Location</h3>
              </div>

              <div className="flex-1">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border border-blue-100 flex items-center justify-center">
                  <span className="text-blue-500 text-3xl">🤝</span>
                </div>
                <h3 className="font-semibold text-gray-800">Select the Best Deal</h3>
              </div>

              <div className="flex-1">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border border-blue-100 flex items-center justify-center">
                  <span className="text-blue-500 text-3xl">🚗</span>
                </div>
                <h3 className="font-semibold text-gray-800">Reserve Your Rental Car</h3>
              </div>
            </div>

            <button className="px-8 py-3 rounded bg-[#1089ff] text-white font-semibold shadow-md">
              Reserve Your Perfect Car
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero