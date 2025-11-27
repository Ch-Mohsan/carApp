import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Text from "../components/Text";


export default function Layout({ children }) {
  const { pathname } = useLocation();

    const getBg = () => {
    if (pathname === "/") return "/images/bg_1.jpg";
    else  return "/images/about.jpg";
    
  };

  const getSectionLabel = () => {
    if (pathname === "/") return null;
    const map = {
      "/about": "about",
      "/services": "services",
      "/blog": "blog",
      "/pricing": "pricing",
      "/cars": "cars",
      "/contact": "contact"
    };
    return map[pathname] || pathname.replace(/^\//, "");
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
    {/* Bottom-left page heading for non-home routes */}
    {getSectionLabel() && (
    <div className="absolute text-4xl left-16 top-[50%] z-10">
        <Text Text={` ${getSectionLabel()}`} />
      </div>
    )}
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
