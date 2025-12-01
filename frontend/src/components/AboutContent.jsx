import React from "react";
import { motion } from 'framer-motion'
import { staggerContainer, viewFadeUp, fadeUp } from '../components/animations'

export default function AboutSection() {
  return (
    <motion.section
      className="w-full bg-white relative text-white text-lg overflow-x-auto overflow-y-hidden md:overflow-visible md:overflow-y-visible"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* MOBILE (column): image first, then content */}
      {/* On md+: we switch to a row and use absolute positioning for overlap */}
      <div className="flex flex-col md:flex-row items-start  md:gap-0 md:items-center relative">
        {/* IMAGE block */}
        <motion.div className="w-full md:w-[60%] h-[50vh] md:h-[100vh] relative md:top-24" variants={fadeUp}>
          {/* On mobile the image fills the block.
              On md+ we reduce its width & height and position it so it overlaps the content */}
          <motion.img
            src="/images/about.jpg"
            alt="About"
            className="
              w-full h-full object-cover shadow-2xl
              md:w-[60%] md:h-[80%] md:object-cover
              md:absolute md:top-10 md:left-8
              md:translate-y-0
              z-40
            "
            loading="lazy"
          />
        </motion.div>

        {/* CONTENT block */}
        <motion.div
          className="
            w-full md:w-[70%]  md:h-screen
            bg-[#01d28e] relative
            md:absolute md:right-10 md:top-[10%]
            flex items-center
            overflow-hidden
            z-20
          "
          variants={viewFadeUp}
        >
          {/* inner wrapper controls width of text on larger screens */}
          <motion.div className="w-[88%] md:w-[70%]  mx-auto md:mr-4 text-justify  py-6 md:py-12 flex flex-col gap-4" variants={staggerContainer}>
            <motion.h2 className="text-2xl font-semibold text-white" variants={fadeUp}>About us</motion.h2>
            <motion.h1 className="text-4xl font-semibold py-3 text-white text-wrap leading-12 " variants={fadeUp}>
              Welcome to Rent A Car
            </motion.h1>
            <motion.p className="text-md leading-7 text-white text-wrap" variants={fadeUp}>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country, in
              which roasted parts of sentences fly into your mouth.
            </motion.p>
            <motion.p className="text-sm leading-9 text-white md:pr-4" variants={fadeUp}>
             On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
            </motion.p>
            <motion.button className="text-lg p-3 w-[150px] text-center bg-[#1089ff] text-white rounded" variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              Search Vehicle
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
