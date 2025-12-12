import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectCurrentUserWithRoles } from '../feetures/UserSlices.js'
import { FaBars } from "react-icons/fa"

function Navbar() {
  const [Menu, setMenu] = useState(false);
  const [adminSubOpen, setAdminSubOpen] = useState(false);
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
    const update = () => {
      const menuH = menuRef.current ? menuRef.current.scrollHeight : 0;
      root.style.setProperty('--menu-shift', `${menuH}px`);
    };
    if (Menu) {
      update();
      body.classList.add('menu-open');
      requestAnimationFrame(update);
      const onResize = () => update();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    } else {
      root.style.setProperty('--menu-shift', `0px`);
      body.classList.remove('menu-open');
    }
  }, [Menu]);

  // recalc push when admin submenu toggles inside mobile menu
  useEffect(() => {
    if (!Menu) return;
    const root = document.documentElement;
    const menuH = menuRef.current ? menuRef.current.scrollHeight : 0;
    root.style.setProperty('--menu-shift', `${menuH}px`);
  }, [adminSubOpen, Menu]);

  // Auto-scroll submenu into view on mobile when Dashboard expands
  useEffect(() => {
    if (!Menu || !adminSubOpen) return;
    const list = menuRef.current;
    if (!list) return;
    const marker = list.querySelector('[data-submenu-start]');
    const top = marker ? (marker.offsetTop - 12) : list.scrollHeight;
    try {
      list.scrollTo({ top, behavior: 'smooth' });
    } catch {
      list.scrollTop = top;
    }
  }, [adminSubOpen, Menu]);

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
        className={`navbar navbar-custom w-full ${(forceLight || navLight) ? 'text-black' : 'text-white'}`}
        animate={{
          // Force white on dashboard; else animate by scroll
          backgroundColor: (forceLight || navLight) ? '#ffffff' : (isDesktop ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.85)'),
          boxShadow: (forceLight || navLight) ? '0 1px 12px rgba(0,0,0,0.08)' : '0px 0px 0px rgba(0,0,0,0)'
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="container navbar-inner">
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
            <li className='mx-6'><a href='/bookings' className={linkClass('/bookings')}>Bookings</a></li>
            <li className='mx-6'><a href='/blog' className={linkClass('/blog')}>Blog</a></li>
            <li className='mx-6'><a href='/contact' className={linkClass('/contact')}>Contact</a></li>
            {isAdmin && (
              <li className='mx-6'>
                <a href='/dashboard' className={linkClass('/dashboard')}>Dashboard</a>
              </li>
            )}
          </ul>

          <div className={`md:hidden flex ml-auto`}>
            <button
              aria-expanded={Menu}
              aria-label="Toggle menu"
              onClick={hendleMenuClick}
              className="px-2 py-1 rounded-md bg-white/85 text-black shadow"
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu with click-outside close */}
      {Menu && (
        <div className='fixed inset-0 z-40' onClick={() => setMenu(false)}>
          <div className='absolute inset-0 bg-white/60 backdrop-blur-sm' />
          <ul ref={menuRef} className={`mobile-menu h-auto w-full md:hidden flex flex-col justify-start items-start gap-1 ${Menu ? 'open' : ''} bg-white text-black relative z-50`} style={{ maxHeight: '80vh', overflowY: 'auto' }} onClick={(e)=>e.stopPropagation()}>
            <li className={`mx-4 my-2 cursor-pointer ${getpath=='/home'? "text-[#1089ff]" : ""} `} ><a href="/home" onClick={() => setMenu(false)}>Home </a></li>
            <li className={`mx-4 my-2 cursor-pointer ${getpath=='/about'? "text-[#1089ff]" : ""}`}><a href="/about" onClick={() => setMenu(false)}>About</a></li>
            <li className={`mx-4 my-2 cursor-pointer ${getpath=='/services'? "text-[#1089ff]" : ""}`}><a href="/services" onClick={() => setMenu(false)}>Services</a></li>
            <li className={`mx-4 my-2 cursor-pointer ${getpath=='/price'? "text-[#1089ff]" : ""}`}><a href="/price" onClick={() => setMenu(false)}>Price</a></li>
            <li className={`mx-4 my-2 cursor-pointer ${getpath=='/cars'? "text-[#1089ff]" : ""}`}><a href="/cars" onClick={() => setMenu(false)}>Cars</a></li>
            <li className={`mx-4 my-2 cursor-pointer ${getpath=='/bookings'? "text-[#1089ff]" : ""}`}><a href="/bookings" onClick={() => setMenu(false)}>Bookings</a></li>
            <li className={`mx-4 my-2 cursor-pointer ${getpath=='/blog'? "text-[#1089ff]" : ""}`}><a href="/blog" onClick={() => setMenu(false)}>Blog</a></li>
            <li className={`mx-4 my-2 cursor-pointer ${getpath=='/contact'? "text-[#1089ff]" : ""}`}><a href="/contact" onClick={() => setMenu(false)}>Contact</a></li>
            {isAdmin && (
              <>
                <li className={`mx-4 my-2 cursor-pointer ${getpath=='/dashboard'? "text-[#1089ff]" : ""}`} data-submenu-start>
                  <button className='w-full text-left px-2 py-2 rounded-md bg-gray-100 ring-1 ring-gray-200' onClick={() => setAdminSubOpen(o=>!o)} aria-expanded={adminSubOpen}>Dashboard {adminSubOpen ? '▾' : '▸'}</button>
                </li>
                {adminSubOpen && (
                  <>
                    <li className='w-full pl-6 pr-4'>
                      <a href='/dashboard' className='block px-2 py-2 rounded hover:bg-gray-50 ring-1 ring-transparent' onClick={() => setMenu(false)}>Overview</a>
                    </li>
                    <li className='w-full pl-6 pr-4'>
                      <a href='/dashboard?section=addcar' className='block px-2 py-2 rounded hover:bg-gray-50 ring-1 ring-transparent' onClick={() => setMenu(false)}>Add New Car</a>
                    </li>
                    <li className='w-full pl-6 pr-4'>
                      <a href='/dashboard?section=cars' className='block px-2 py-2 rounded hover:bg-gray-50 ring-1 ring-transparent' onClick={() => setMenu(false)}>Cars Listing</a>
                    </li>
                    <li className='w-full pl-6 pr-4'>
                      <a href='/dashboard?section=bookings' className='block px-2 py-2 rounded hover:bg-gray-50 ring-1 ring-transparent' onClick={() => setMenu(false)}>Booking Records</a>
                    </li>
                    <li className='w-full pl-6 pr-4'>
                      <a href='/dashboard?section=users' className='block px-2 py-2 rounded hover:bg-gray-50 ring-1 ring-transparent' onClick={() => setMenu(false)}>User Records</a>
                    </li>
                    <li className='w-full pl-6 pr-4'>
                      <a href='/dashboard?section=drivers' className='block px-2 py-2 rounded hover:bg-gray-50 ring-1 ring-transparent' onClick={() => setMenu(false)}>Driver Status</a>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar