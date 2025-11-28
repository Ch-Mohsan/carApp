import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Text from "../components/Text";


export default function Layout({ children, overlay }) {
  const { pathname } = useLocation();

  const getBg = () => {
    if (pathname === "/") return "/images/bg_1.jpg";
    else return "/images/about.jpg";
  };

  // Returns route path (e.g., '/about') for breadcrumb/link; null on home
  const getSectionPath = () => {
    if (pathname === "/") return null;
    const known = ["/about", "/services", "/blog", "/pricing", "/cars", "/contact"];
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
        return "Our About";
      case "/services":
        return "Our Services";
      case "/blog":
        return "Our Blog";
      case "/pricing":
        return "Pricing";
      case "/cars":
        return "Choose Your Car";
      case "/contact":
        return "Contact Us";
      default:
        return getSectionLabel() || "";
    }
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
        <Text Path={getSectionPath()} Crumb={getSectionLabel()} Text={getHeadingText()} />
      </div>
    )}
    {overlay && (
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="relative w-full h-full pointer-events-none">
          {overlay}
        </div>
      </div>
    )}
  </div>


  
  <header className="fixed top-0 left-0 w-full z-30" style={{height: 'var(--header-height)'}}>
    <Navbar />
  </header>


    <main className="relative z-20" style={{paddingTop: 'calc(var(--header-height) + var(--menu-shift, 0px))', marginTop: pathname === '/' ? 0 : 'var(--hero-bg-height, 850px)'}}>
      {children ? children : <Outlet />}
  </main>

  <Footer/>
</div>

  );
}
