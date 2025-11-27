import React from "react";

export default function AboutSection() {
  return (
    <section className="w-full bg-white relative text-white text-lg overflow-x-auto overflow-y-hidden md:overflow-visible md:overflow-y-visible">
      {/* MOBILE (column): image first, then content */}
      {/* On md+: we switch to a row and use absolute positioning for overlap */}
      <div className="flex flex-col md:flex-row items-start  md:gap-0 md:items-center relative">
        {/* IMAGE block */}
        <div className="w-full md:w-[60%] h-[50vh] md:h-[100vh] relative md:top-24">
          {/* On mobile the image fills the block.
              On md+ we reduce its width & height and position it so it overlaps the content */}
          <img
            src="/images/about.jpg"
            alt="About"
            className="
              w-full h-full object-cover shadow-2xl
              md:w-[60%] md:h-[80%] md:object-cover
              md:absolute md:top-10 md:left-8
              md:translate-y-0
              z-40
            "
          />
        </div>

        {/* CONTENT block */}
        <div
          className="
            w-full md:w-[70%]  md:h-screen
            bg-[#01d28e] relative
            md:absolute md:right-10 md:top-[10%]
            flex items-center
            overflow-hidden
            z-20
          "
        >
          {/* inner wrapper controls width of text on larger screens */}
          <div className="w-[88%] md:w-[70%]  mx-auto md:mr-4 text-justify  py-6 md:py-12 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-white">About us</h2>
            <h1 className="text-4xl font-semibold py-3 text-white text-wrap leading-12 ">
              Welcome to Rent A Car
            </h1>
            <p className="text-md leading-7 text-white text-wrap">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </p>
            <p className="text-sm leading-9 text-white md:pr-4">
             On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
            </p>
            <button className="text-lg p-3 w-[150px] text-center bg-[#1089ff] text-white rounded">
              Search Vehicle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
