import React from 'react'

function Hero() {
  return (
    <section className="relative">
      <div className="w-full min-h-[680px] flex flex-col text-center items-center justify-center text-white py-24 hero-content-padding">
        <h1 className="font-extrabold text-[44px] mb-6 leading-12">Fast & Easy Way To Rent A Car</h1>
        <p className="hidden md:block text-lg max-w-2xl">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts</p>
        <p className="md:hidden text-lg px-8">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts</p>
        <p className="text-lg mt-4"><span>_____</span>Easy Steps for renting a car</p>
      </div>

      {/* Overlapping panels: left booking panel + right content card. */}
      <div className="absolute left-0 right-0 -bottom-28 flex items-start justify-center px-6 md:px-12">
        <div className="w-[360px] bg-[#1089ff] rounded-lg p-6 shadow-xl text-white">
          <h3 className="text-xl font-bold mb-4">Make your trip</h3>
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

        <div className="w-[62%] bg-white rounded-lg p-10 shadow-lg -ml-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Better Way to Rent Your Perfect Cars</h2>
          <p className="text-gray-600">Choose Your Pickup Location, Select the Best Deal and Reserve Your Rental Car — all in a few easy steps.</p>
        </div>
      </div>
    </section>
  )
}

export default Hero