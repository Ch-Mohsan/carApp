import React from 'react';

export default function AboutSection() {
  return (
    <section className="w-full min-h-screen bg-white py-12 md:py-16 lg:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 items-center">
          {/* Left Image */}
            <div className="relative md:pr-0">
              <div className="rounded-lg overflow-hidden shadow-lg md:shadow-xl md:rounded-l-lg md:rounded-r-none">
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=1000&fit=crop" 
              alt="Car dealership professionals" 
              className="w-full h-full object-cover"
            />
              </div>
            </div>

          {/* Right Green Content Panel */}
            <div className="relative">
              <div className="bg-[#10c06a] text-white shadow-xl md:rounded-r-lg md:rounded-l-none rounded-lg p-6 md:p-10 flex flex-col justify-center md:-ml-10 lg:-ml-16 xl:-ml-20">
            <p className="uppercase tracking-widest text-xs md:text-sm font-semibold mb-3 opacity-90">
              ABOUT US
            </p>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Welcome to Carbook
            </h2>
            
            <p className="leading-relaxed text-base md:text-lg mb-4 opacity-95">
              A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
            </p>
            
            <p className="leading-relaxed text-base md:text-lg mb-8 opacity-95">
              On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 transition-colors">
                Search Vehicle
              </button>
            </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}