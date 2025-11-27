import React from "react";

export default function ServicesSection() {
  const items = [
    {
      title: "Wedding Ceremony",
      description:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      icon: (
        // Rings inside a blue circle
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
          <path d="M22 20a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm12-2h-6l2.5-3.5a2 2 0 1 0-3.2-2.4L23 10.6l-4.3 1.5a2 2 0 1 0 1.3 3.8l2.5-.9-2 2.9a12 12 0 1 0 11.5-0.3L33 18Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "City Transfer",
      description:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      icon: (
        // Route/map icon
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
          <path d="M10 38c0-4 3-6 8-6s8-2 8-6-3-6-8-6-8-2-8-6 3-6 8-6 8 2 8 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="34" cy="12" r="4" fill="currentColor"/>
          <circle cx="34" cy="36" r="4" fill="currentColor"/>
          <path d="M26 12h4m0 24h-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: "Airport Transfer",
      description:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      icon: (
        // Airplane icon
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
          <path d="M6 27l16-5 10-12a3 3 0 1 1 4 4L24 26l-2 10-4-5-6 2 2-6-8-0Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Whole City Tour",
      description:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      icon: (
        // City/Buildings icon
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
          <path d="M10 38V16l8-4 8 4v22H10Z" stroke="currentColor" strokeWidth="3"/>
          <path d="M26 38V12l6-2 6 2v26h-12Z" stroke="currentColor" strokeWidth="3"/>
          <path d="M16 20h4m-4 6h4m10-10h4m-4 6h4" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <section id="services" aria-labelledby="services-heading" className="w-full bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Eyebrow */}
        <p className="text-center text-xs tracking-[0.3em] font-semibold text-blue-600 uppercase">Services</p>
        {/* Heading */}
        <h2 id="services-heading" className="mt-3 text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Our Latest Services
        </h2>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <article
              key={item.title}
              className="group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white  ring-gray-100 "
            >
              <div className="flex items-center justify-center w-30 h-30 rounded-full bg-blue-500 text-white">
                {item.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-3 text-md leading-7 text-gray-600 max-w-xs">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
