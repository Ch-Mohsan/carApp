import React from 'react'

// About section: left image, right green content box, responsive stacking
function AboutContent() {
  return (
    <section className="w-full px-4 md:px-8 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
        {/* Left image */}
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <img src="/images/image_1.jpg" alt="About Carbook" className="w-full h-full object-cover" />
        </div>

        {/* Right green content panel */}
        <div className="bg-[#10c06a] md:bg-[#11c06a] lg:bg-[#11c06a] rounded-lg p-6 md:p-10 text-white shadow-lg flex flex-col justify-center">
          <p className="uppercase tracking-widest text-sm font-semibold mb-2">About us</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Welcome to Carbook</h2>
          <p className="leading-relaxed mb-4">
            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
          </p>
          <p className="leading-relaxed mb-6">
            On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#cars" className="px-6 py-3 bg-white text-[#10c06a] font-semibold rounded shadow hover:bg-gray-100">Search your Vehicle</a>
            <a href="#" className="px-6 py-3 bg-[#1089ff] text-white font-semibold rounded shadow hover:bg-[#0d75db]">Learn more</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutContent
