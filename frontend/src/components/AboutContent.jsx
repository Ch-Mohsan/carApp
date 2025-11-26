import React from 'react';

// Side-by-side: image left (on top visually), content right expanded 20% width & height and overlapped under the image.
export default function AboutSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto relative overflow-visible">
        <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-0 relative">
          {/* Image (top layer) */}
          <div className="md:w-1/2 relative z-20">
            <div className=" overflow-hidden shadow-2xl border border-gray-200 h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px]">
              <img
                src="/images/image_2.jpg"
                alt="About Carbook"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content panel (beneath, enlarged & overlapped) */}
          <div className="md:w-1/2 relative">
            <div
              className="bg-[#10c06a] text-white rounded-xl shadow-2xl flex flex-col z-10 md:absolute overflow-hidden"
              style={{
                top: '-100px',
                bottom: '-100px',
                left: '-180px',
                right: '-180px',
                padding: '64px 84px',
              }}
            >
              <p className="uppercase tracking-widest text-xs md:text-sm font-semibold mb-4 text-center">About Us</p>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-center mb-8">Welcome to Carbook</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="leading-relaxed text-base md:text-lg opacity-95 text-center md:text-left">
                  A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
                </p>
                <p className="leading-relaxed text-base md:text-lg opacity-95 text-center md:text-left">
                  On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.
                </p>
              </div>
              <div className="mt-10">
                <a href="#cars" className="inline-block px-10 py-4 bg-[#1089ff] hover:bg-[#0d75db] text-white font-semibold rounded-lg shadow transition-colors">Search Vehicle</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}