import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Layout({ children }) {
  const { pathname } = useLocation();

    const getBg = () => {
    if (pathname === "/") return "/images/bg_1.jpg";
    if (pathname.startsWith("/about")) return "/images/about.jpg";
    if (pathname.startsWith("/cars")) return "/images/bg_1.jpg";
    return "/images/default-hero.jpg";
  };

  return (
   <div className="min-h-screen relative bg-white overflow-hidden" > 
  
  {/* Top hero background is limited to the hero area height */}
  <div className="absolute top-0 left-0 right-0 z-0" style={{ height: 'var(--hero-bg-height, 850px)' }}>
    <img
      src={getBg()}
      alt="background"
      className="bg-hero absolute inset-0 w-full h-full object-cover object-top brightness-[80%] saturate-[85%]"
      loading="eager"
    />
    {/* overlay only over the hero area */}
    <div aria-hidden="true" className="absolute inset-0 hero-overlay" />
  </div>


  
  <header className="fixed top-0 left-0 w-full z-30" style={{height: 'var(--header-height)'}}>
    <Navbar />
  </header>


  <main className="relative z-20" style={{paddingTop: 'calc(var(--header-height) + var(--menu-shift, 0px))'}}>
    {children}
  </main>

  <Footer/>
</div>

  );
}
