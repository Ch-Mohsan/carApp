import React from 'react';

function Hero() {
  return (
    <section className="relative w-full">
      {/* Top hero content - uses MainLayout background/overlay */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="flex justify-center">
          <div className="max-w-3xl text-center text-white">
            <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Fast &amp; Easy Way To Rent A Car
            </h1>
            <p className="mb-6 text-base sm:text-lg md:text-xl leading-relaxed">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country,
              in which roasted parts
            </p>

            {/* Play button + heading like main layout */}
            <a
              href="#"
              className="inline-flex items-center justify-center mt-4"
            >
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#01d28e] text-white shadow-lg">
                <span className="ion-ios-play text-xl sm:text-2xl" />
              </div>
              <div className="ml-5 text-left">
                <span className="text-sm sm:text-base uppercase tracking-wide text-white/80">
                  Easy steps for renting a car
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom section matching main layout (form + info) */}
      <section className="relative -mt-16 sm:-mt-20 lg:-mt-24 bg-gray-100 pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: booking form (similar to col-md-4 request-form) */}
              <div className="lg:col-span-1 flex items-stretch">
                <form className="w-full bg-[#1089ff] text-white rounded-lg shadow-2xl p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6">Make your trip</h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                        Pick-up Location
                      </label>
                      <input
                        type="text"
                        placeholder="City, Airport, Station, etc"
                        className="w-full bg-white/15 border border-white/30 rounded px-3 py-2.5 text-sm sm:text-base text-white placeholder-white/70 focus:outline-none focus:border-white/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                        Drop-off Location
                      </label>
                      <input
                        type="text"
                        placeholder="City, Airport, Station, etc"
                        className="w-full bg-white/15 border border-white/30 rounded px-3 py-2.5 text-sm sm:text-base text-white placeholder-white/70 focus:outline-none focus:border-white/60"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                          Pick-up Date
                        </label>
                        <input
                          type="text"
                          placeholder="Date"
                          className="w-full bg-white/15 border border-white/30 rounded px-3 py-2.5 text-sm sm:text-base text-white placeholder-white/70 focus:outline-none focus:border-white/60"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                          Drop-off Date
                        </label>
                        <input
                          type="text"
                          placeholder="Date"
                          className="w-full bg-white/15 border border-white/30 rounded px-3 py-2.5 text-sm sm:text-base text-white placeholder-white/70 focus:outline-none focus:border-white/60"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                        Pick-up Time
                      </label>
                      <input
                        type="text"
                        placeholder="Time"
                        className="w-full bg-white/15 border border-white/30 rounded px-3 py-2.5 text-sm sm:text-base text-white placeholder-white/70 focus:outline-none focus:border-white/60"
                      />
                    </div>

                    <button className="w-full mt-3 bg-[#01d28e] hover:bg-[#00bc7d] text-white font-semibold py-3 rounded transition duration-200 text-sm sm:text-base">
                      Rent A Car Now
                    </button>
                  </div>
                </form>
              </div>

              {/* Right: info card (similar to .services-wrap col-md-8) */}
              <div className="lg:col-span-2 flex items-stretch">
                <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 lg:p-10 w-full flex flex-col">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    Better Way to Rent Your Perfect Cars
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 flex items-center justify-center mb-3 rounded-full bg-blue-50 text-[#1089ff]">
                        <span className="flaticon-route text-2xl" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                        Choose Your Pickup Location
                      </h3>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 flex items-center justify-center mb-3 rounded-full bg-blue-50 text-[#1089ff]">
                        <span className="flaticon-handshake text-2xl" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                        Select the Best Deal
                      </h3>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 flex items-center justify-center mb-3 rounded-full bg-blue-50 text-[#1089ff]">
                        <span className="flaticon-rent text-2xl" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                        Reserve Your Rental Car
                      </h3>
                    </div>
                  </div>

                  <div>
                    <button className="inline-flex items-center justify-center bg-[#1089ff] hover:bg-[#0d75e0] text-white font-semibold py-3 px-8 rounded transition duration-200 text-sm sm:text-base">
                      Reserve Your Perfect Car
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Hero;