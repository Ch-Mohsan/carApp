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
   <div className="min-h-screen relative bg-white"> 
  
  <img
    src={getBg()}
    alt="background"
    className="bg-hero absolute inset-0 w-full h-full object-cover object-top z-0 brightness-[80%] saturate-[85%]"
    loading="eager"
  />

  {/* overlay */}
 <div
  aria-hidden="true"
  className="absolute inset-0 z-10"
  style={{
    background: `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.15) 0%,   /* top lighter */
        rgba(0, 0, 0, 0.25) 50%,  /* middle */
        rgba(0, 0, 0, 0.35) 100%  /* bottom slightly darker */
      ),
      radial-gradient(
        50% 60% at 20% 20%,
        rgba(0, 0, 0, 0.10),
        transparent 40%
      )
    `,
  }}
/>


  
  <header className="fixed top-0 left-0 w-full z-30" style={{height: 'var(--header-height)'}}>
    <Navbar />
  </header>


  <main className="relative z-20" style={{paddingTop: 'calc(var(--header-height) + var(--menu-shift, 0px))'}}>
    {children}
  </main>

  <footer className="relative z-40">
   
  </footer>
</div>

  );
}
