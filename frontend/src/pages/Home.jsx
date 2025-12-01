import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, viewFadeUp, fadeUp } from '../components/animations'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'

import AboutContent from '../components/AboutContent'
import ServicesSection from '../components/Services'
import ClientCarousel from '../components/Client'
import BlogSection from '../components/Blog'
import Feeatured from '../components/Feetured'

function Home() {
  return (
    <PageTransition>
      <>
        <Hero />
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          <motion.div variants={viewFadeUp}><Feeatured /></motion.div>
          <motion.div variants={viewFadeUp}><AboutContent /></motion.div>
          <motion.div variants={viewFadeUp}><ServicesSection /></motion.div>
          <motion.div variants={viewFadeUp}><ClientCarousel /></motion.div>
          <motion.div variants={viewFadeUp}><BlogSection /></motion.div>
        </motion.div>
      </>
    </PageTransition>
  )
}

export default Home