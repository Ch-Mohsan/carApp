import React, { useEffect, useMemo, useState } from "react";
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewFadeUp } from '../components/animations'

// Responsive carousel: 3 cards per slide on md+, 2 on mobile.
// Uses public images: /images/person_1.jpg, /images/person_2.jpg, /images/person_3.jpg
export default function ClientCarousel() {
  const data = useMemo(() => (
    [
      {
        name: "Jacob Smith",
        role: "Happy Customer",
        img: "/images/person_1.jpg",
        text:
          "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      },
      {
        name: "Emily Brown",
        role: "Happy Customer",
        img: "/images/person_2.jpg",
        text:
          "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
      },
      {
        name: "Michael Lee",
        role: "Happy Customer",
        img: "/images/person_3.jpg",
        text:
          "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia."
      },
      {
        name: "Sophia Turner",
        role: "Happy Customer",
        img: "/images/person_1.jpg",
        text:
          "Separated they live in Bookmarksgrove right at the coast of the Semantics."
      },
      {
        name: "Daniel Carter",
        role: "Happy Customer",
        img: "/images/person_2.jpg",
        text:
          "A small river named Duden flows by their place and supplies it with the necessary regelialia."
      },
      {
        name: "Ava Johnson",
        role: "Happy Customer",
        img: "/images/person_3.jpg",
        text:
          "It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
      }
    ]
  ), []);

  const [index, setIndex] = useState(0); // 0..3
  const [perSlide, setPerSlide] = useState(3);

  // Compute per-slide by breakpoints: <640 => 1, 640-767 => 2, >=768 => 3
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setPerSlide(1);
      else if (w < 768) setPerSlide(2);
      else setPerSlide(3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

    // Autoplay removed: change only via dots (defined after slides)

    // Build four slides as requested:
    // 1) unique cards, 2) all first person, 3) all second, 4) all third
    const base = useMemo(() => {
      const p1 = data.find((d) => d.img.includes("person_1")) || data[0];
      const p2 = data.find((d) => d.img.includes("person_2")) || data[1] || data[0];
      const p3 = data.find((d) => d.img.includes("person_3")) || data[2] || data[0];
      return [p1, p2, p3];
    }, [data]);

    const slides = useMemo(() => {
      const s1 = Array.from({ length: perSlide }, (_, i) => base[i % base.length]);
      const s2 = Array.from({ length: perSlide }, () => base[0]);
      const s3 = Array.from({ length: perSlide }, () => base[1]);
      const s4 = Array.from({ length: perSlide }, () => base[2]);
      return [s1, s2, s3, s4];
    }, [base, perSlide]);

    const totalSlides = slides.length;

    // Ensure index stays in range if breakpoint changes
    useEffect(() => {
      setIndex((i) => (i >= totalSlides ? 0 : i));
    }, [totalSlides]);

    // Dots click navigation only (no autoplay)
    const goTo = (i) => setIndex(((i % totalSlides) + totalSlides) % totalSlides);

  // Removed previous-index tracking as slides now snap by groups

  return (
    <motion.section id="clients" className="w-full bg-white"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.p className="text-center text-xs tracking-[0.3em] font-semibold text-blue-600 uppercase" variants={fadeUp}>
          Clients
        </motion.p>
        <motion.h2 className="mt-3 text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900" variants={fadeUp}>
          Happy Clients
        </motion.h2>

        {/* Carousel viewport */}
        <motion.div className="mt-12 relative" variants={viewFadeUp}>
          {/* Carousel sliding viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${slides.length * 100}%`,
                transform: `translateX(-${index * (100 / slides.length)}%)`
              }}
            >
              {slides.map((group, slideIdx) => (
                <div
                  key={`slide-${slideIdx}`}
                  className="flex justify-center gap-6 sm:gap-8 shrink-0 px-1"
                  style={{ width: `${100 / (slides.length || 1)}%` }}
                >
                  {group.map((item, idx) => {
                    const variant = item.img.includes('person_1')
                      ? 'Interface Designer'
                      : item.img.includes('person_2')
                      ? 'UI Designer'
                      : 'Web Developer';
                    return (
                    <article
                      key={`${slideIdx}-${idx}`}
                      className="flex-1 max-w-[360px] w-full sm:w-auto bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center min-h-[380px] flex flex-col"
                    >
                      <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="mt-5 text-lg sm:text-xl font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500">{item.role}</p>
                      <p className="mt-4 text-sm sm:text-base leading-7 text-gray-600 flex-grow">
                        {item.text}
                      </p>
                      {/* Added uniform lines as requested */}
                      <p className="mt-4 text-lg font-semibold text-gray-900">Roger Scott</p>
                      <p className="text-sm sm:text-base text-[#1089ff]">{variant}</p>
                    </article>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? "bg-[#01d28e]" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
