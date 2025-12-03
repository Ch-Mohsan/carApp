import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectCurrentUserWithRoles } from '../feetures/UserSlices.js'
import { FaBars } from "react-icons/fa"

function Navbar() {
  const [Menu, setMenu] = useState(false);
  const [navLight, setNavLight] = useState(false);
  const getpath = window.location.pathname;
  const menuRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const currentUser = useSelector(selectCurrentUserWithRoles)
  const isAdmin = !!(currentUser && currentUser.isAdmin)
  const forceLight = getpath === '/dashboard'

  const hendleMenuClick = () => {
    setMenu((m) => !m);
  }

  // manage mobile menu push
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (Menu) {
      const menuH = menuRef.current ? menuRef.current.scrollHeight : 0;
      root.style.setProperty('--menu-shift', `${menuH}px`);
      body.classList.add('menu-open');
    } else {
      root.style.setProperty('--menu-shift', `0px`);
      body.classList.remove('menu-open');
    }
  }, [Menu]);

  // track viewport to differentiate desktop vs mobile backgrounds
  useEffect(() => {
    const compute = () => setIsDesktop(window.innerWidth >= 768);
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // scroll threshold: demo uses ~150px to switch navbar style
  useEffect(() => {
    const onScroll = () => setNavLight(forceLight ? true : window.scrollY > 150);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // reflect navLight on body so global CSS can target it
  useEffect(() => {
    const light = forceLight ? true : navLight
    if (light) document.body.classList.add('nav-scrolled');
    else document.body.classList.remove('nav-scrolled');
    return () => { document.body.classList.remove('nav-scrolled'); };
  }, [navLight, forceLight]);

  const linkClass = (path) => {
    const active = getpath === path;
    const light = forceLight ? true : navLight
    if (light) {
      return `transition-colors duration-200 ${active ? 'text-[#1089ff]' : 'text-black hover:text-[#1089ff]'} no-underline`;
    }
    return `transition-colors duration-200 ${active ? 'text-[#01d28e]' : 'text-white hover:text-[#01d28e]'} no-underline`;
  };

  return (
    <>
      <motion.div
        className={`navbar-custom w-full h-full ${(forceLight || navLight) ? 'text-black' : 'text-white'}`}
        animate={{
          // Force white on dashboard; else animate by scroll
          backgroundColor: (forceLight || navLight) ? '#ffffff' : (isDesktop ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.85)'),
          boxShadow: (forceLight || navLight) ? '0 1px 12px rgba(0,0,0,0.08)' : '0px 0px 0px rgba(0,0,0,0)'
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center px-6 md:px-12 py-4">
          <div className='flex items-center text-lg md:text-xl font-extrabold md:px-4 flex-shrink-0 whitespace-nowrap'>
            <span className={`${(forceLight || navLight) ? 'text-black' : 'text-white'}`}>CAR</span>
            <span className='text-[#01d28e] ml-1'>BOOK</span>
          </div>

          <ul className='hidden md:flex items-center justify-center flex-1 text-[16px]'>
            <li className='mx-6'><a href='/home' className={linkClass('/home')}>Home</a></li>
            <li className='mx-6'><a href='/about' className={linkClass('/about')}>About</a></li>
            <li className='mx-6'><a href='/services' className={linkClass('/services')}>Services</a></li>
            <li className='mx-6'><a href='/price' className={linkClass('/price')}>Price</a></li>
            <li className='mx-6'><a href='/cars' className={linkClass('/cars')}>Cars</a></li>
            <li className='mx-6'><a href='/bookings' className={linkClass('/bookings')}>myBookings</a></li>
            <li className='mx-6'><a href='/blog' className={linkClass('/blog')}>Blog</a></li>
            <li className='mx-6'><a href='/contact' className={linkClass('/contact')}>Contact</a></li>
            {isAdmin && (
              <li className='mx-6'><a href='/dashboard' className={linkClass('/dashboard')}>Dashboard</a></li>
            )}
          </ul>

          <div className={`md:hidden flex ml-auto ${navLight ? 'text-black' : 'text-white'}`}>
            <button aria-expanded={Menu} aria-label="Toggle menu" onClick={hendleMenuClick} className={`px-2 py-1 font-thin ${navLight ? 'text-black/80' : 'text-[#ffffff80]'}`}><FaBars size={20} /></button>
          </div>
        </div>
      </motion.div>

      <ul ref={menuRef} className={`mobile-menu h-auto w-full md:hidden flex flex-col justify-evenly items-start ${Menu ? 'open' : ''} ${navLight ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <li className={`mx-4 my-2 cursor-pointer ${getpath=='/home'? "text-[#1089ff]" : ""} `} ><a href="/home" onClick={() => setMenu(false)}>Home </a></li>
        <li className={`mx-4 my-2 cursor-pointer ${getpath=='/about'? "text-[#1089ff]" : ""}`}><a href="/about" onClick={() => setMenu(false)}>About</a></li>
        <li className={`mx-4 my-2 cursor-pointer ${getpath=='/services'? "text-[#1089ff]" : ""}`}><a href="/services" onClick={() => setMenu(false)}>Services</a></li>
        <li className={`mx-4 my-2 cursor-pointer ${getpath=='/price'? "text-[#1089ff]" : ""}`}><a href="/price" onClick={() => setMenu(false)}>Price</a></li>
        <li className={`mx-4 my-2 cursor-pointer ${getpath=='/cars'? "text-[#1089ff]" : ""}`}><a href="/cars" onClick={() => setMenu(false)}>Cars</a></li>
        <li className={`mx-4 my-2 cursor-pointer ${getpath=='/bookings'? "text-[#1089ff]" : ""}`}><a href="/bookings" onClick={() => setMenu(false)}>myBookings</a></li>
        <li className={`mx-4 my-2 cursor-pointer ${getpath=='/blog'? "text-[#1089ff]" : ""}`}><a href="/blog" onClick={() => setMenu(false)}>Blog</a></li>
        <li className={`mx-4 my-2 cursor-pointer ${getpath=='/contact'? "text-[#1089ff]" : ""}`}><a href="/contact" onClick={() => setMenu(false)}>Contact</a></li>
        {isAdmin && (
          <li className={`mx-4 my-2 cursor-pointer ${getpath=='/dashboard'? "text-[#1089ff]" : ""}`}><a href="/dashboard" onClick={() => setMenu(false)}>Dashboard</a></li>
        )}
      </ul>
    </>
  )
}

export default Navbar