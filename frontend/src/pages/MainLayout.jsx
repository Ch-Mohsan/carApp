import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Text from "../components/Text";
import AvailabilitySync from "../components/AvailabilitySync";


export default function Layout({ children, overlay }) {
  const { pathname } = useLocation();
  const showHero = pathname !== "/dashboard";

  const getBg = () => {
    if (pathname === "/home") return "/images/bg_1.jpg"; // keep home
    if (pathname === "/about") return "/images/about.jpg"; // keep about
    const map = {
      "/services": "/images/hero_services.jpeg",
      "/blog": "/images/hero_blog.jpg",
      "/pricing": "/images/hero_pricing.jpg",
      "/cars": "/images/hero_cars.jpeg",
      "/contact": "/images/hero_contact.avif",
      "/bookings": "/images/hero_bookings.avif",
      "/add-booking": "/images/hero_addbookings.jpg",
      "/price": "/images/hero_pricing.jpeg",

    };
    return map[pathname] || "/images/exta.avif";
  };

  // Returns route path (e.g., '/about') for breadcrumb/link; null on home
  const getSectionPath = () => {
    if (pathname === "/home") return null;
    const known = ["/about", "/services", "/blog", "/pricing", "/cars", "/contact", "/home"];
    return known.includes(pathname) ? pathname : pathname;
  };

  // Returns plain label (e.g., 'about') for truthy check
  const getSectionLabel = () => {
    const path = getSectionPath();
    if (!path) return null;
    return path.replace(/^\//, "");
  };

  // Returns the big heading text shown on hero
  const getHeadingText = () => {
    switch (pathname) {
      case "/about":
        return "About Our Company";
      case "/services":
        return "Premium Car Rental Services";
      case "/blog":
        return "Insights & Travel Tips";
      case "/pricing":
      case "/price":
        return "Transparent Pricing Plans";
      case "/cars":
        return "Explore Our Fleet";
      case "/contact":
        return "We’re Here To Help";
      case "/bookings":
        return "Your Booking History";
      case "/add-booking":
        return "Complete Your Booking";
      default:
        return getSectionLabel() || "";
    }
  };

  return (
   <div className="min-h-screen relative bg-white overflow-hidden" > 
  {/* Availability derived from bookings; sync component is a no-op */}
  <AvailabilitySync />
  
  {/* Top hero background is limited to the hero area height */}
  {showHero && (
  <AnimatePresence mode="wait">
    <motion.div
      key={pathname}
      className="absolute top-0 left-0 right-0 z-0"
      style={{ height: 'var(--hero-bg-height, 850px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <motion.img
        src={getBg()}
        alt="background"
        className="bg-hero absolute inset-0 w-full h-full object-cover object-top brightness-[80%] saturate-[85%]"
        loading="eager"
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* overlay only over the hero area */}
      <div aria-hidden="true" className="absolute inset-0 hero-overlay" />
      {/* Bottom-left page heading for non-home routes */}
      {getSectionLabel() && (
        <motion.div
          className="absolute text-4xl left-16 top-[50%] z-10"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Text Path={getSectionPath()} Crumb={getSectionLabel()} Text={getHeadingText()} />
        </motion.div>
      )}
      {overlay && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="relative w-full h-full pointer-events-none">
            {overlay}
          </div>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
  )}


  
  <header className="fixed top-0 left-0 w-full z-30" style={{height: 'var(--header-height)'}}>
    <Navbar />
  </header>


  <main className="relative z-20" style={{paddingTop: 'calc(var(--header-height) + var(--menu-shift, 0px))', marginTop: (!showHero || pathname === '/home') ? 0 : 'var(--hero-bg-height, 780px)'}}>
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children ?? <Outlet />}
    </motion.div>
  </main>

  <Footer/>
</div>

  );
}
