import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, viewFadeUp, fadeUp } from '../components/animations'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'

import AboutContent from '../components/AboutContent'
import ServicesSection from '../components/Services'
import ClientCarousel from '../components/Client'
import BlogSection from '../components/Blog'
import Feeatured from '../components/Feetured'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllCars, fetchCarsThunk } from '../feetures/carsSlices.js'
import { fetchAllBookingsThunk } from '../feetures/bookingSlice.js'

function Home() {
  const dispatch = useDispatch()
  const cars = useSelector(selectAllCars)

  // Bootstrap data for Home sections (Featured depends on cars/bookings)
  useEffect(() => {
    if (!cars || cars.length === 0) dispatch(fetchCarsThunk())
    dispatch(fetchAllBookingsThunk())
  }, [])
  return (
    <PageTransition>
      <>
        <Hero />
        <motion.div className="container" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
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