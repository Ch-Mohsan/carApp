import React, { useState, useEffect, useRef } from 'react'
import { FaBars } from "react-icons/fa"

function Navbar() {
  const [Menu, setMenu] = useState(false);
  const getpath = window.location.pathname;
  const menuRef = useRef(null);

  const hendleMenuClick = () => {
    setMenu((m) => !m);
  }   

  useEffect(() => {
    // We only change the menu shift; keep header height constant so navbar contents don't move.
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
  return (
    <>
    <div className='w-full h-full bg-black md:bg-transparent flex md:items-end items-center md:justify-between md:px-12  justify-between px-6 py-2 md:py-0'>
      <div className=' flex  md:items-center  text-xl font-extrabold md:px-4  '><span className='text-white'>CAR</span><span className='text-[#01d28e]'>BOOK</span></div>
      <ul className='hidden md:flex items-center  text-white text-[16px]   md:w-[55%] '>
        <li className={`mx-6 cursor-pointer ${getpath === "/" ? " text-[#01d28e]" : ""}`}><a href="/">Home</a></li>
        <li className={`mx-6 cursor-pointer ${getpath === "/about" ? "text-[#01d28e]" : ""}`}><a href="/about">About</a></li>
        <li className={`mx-6 cursor-pointer ${getpath === "/services" ? "text-[#01d28e]" : ""}`}><a href="/services">Services</a></li>
        <li className={`mx-6 cursor-pointer ${getpath === "/price" ? "text-[#01d28e]" : ""}`}><a href="/price">Price</a></li>
        <li className={`mx-6 cursor-pointer ${getpath === "/blog" ? "text-[#01d28e]" : ""}`}><a href="/blog">Blog</a></li>
        <li className={`mx-6 cursor-pointer ${getpath === "/contact" ? "text-[#01d28e]" : ""}`}><a href="/contact">Contact</a></li>
          
      </ul>
      <div className='md:hidden flex text-white '>
        {/* {menu bars} */}
        <button aria-expanded={Menu} aria-label="Toggle menu" onClick={hendleMenuClick} className="px-2 py-1 text-[#ffffff80] font-thin"> <FaBars  size={20} /></button>
      </div>
      {/* {mobile menu} */}
     </div>

      <ul ref={menuRef} className={`mobile-menu h-auto w-full bg-black text-white md:hidden flex flex-col justify-evenly items-start ${Menu ? 'open' : ''}`}>
          <li className={`mx-4 my-2 cursor-pointer ${getpath=='/'? "text-[#1089ff]" : ""} `} ><a href="/" onClick={() => setMenu(false)}>Home </a></li>
          <li className={`mx-4 my-2 cursor-pointer ${getpath=='/about'? "text-[#1089ff]" : ""}`}><a href="/about" onClick={() => setMenu(false)}>About</a></li>
          <li className={`mx-4 my-2 cursor-pointer ${getpath=='/services'? "text-[#1089ff]" : ""}`}><a href="/services" onClick={() => setMenu(false)}>Services</a></li>  
          <li className={`mx-4 my-2 cursor-pointer ${getpath=='/price'? "text-[#1089ff]" : ""}`}><a href="/price" onClick={() => setMenu(false)}>Price</a></li>
          <li className={`mx-4 my-2 cursor-pointer ${getpath=='/car'? "text-[#1089ff]" : ""}`}><a href="/car" onClick={() => setMenu(false)}>Car</a></li>
          <li className={`mx-4 my-2 cursor-pointer ${getpath=='/blog'? "text-[#1089ff]" : ""}`}><a href="/blog" onClick={() => setMenu(false)}>Blog</a></li>  
          <li className={`mx-4 my-2 cursor-pointer ${getpath=='/contact'? "text-[#1089ff]" : ""}`}><a href="/contact" onClick={() => setMenu(false)}>Contact</a></li>  
          
        </ul>
    </>
  )
}

export default Navbar