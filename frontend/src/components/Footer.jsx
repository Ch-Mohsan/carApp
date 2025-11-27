import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand + description */}
          <div>
            <div className="text-2xl font-extrabold tracking-tight">
              <span>CAR</span>
              <span className="text-[#01d28e]">BOOK</span>
            </div>
            <p className="mt-6 text-sm leading-7 text-gray-300 max-w-xs">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>
            <div className="mt-8 flex items-center gap-4">
              {/* Twitter */}
              <a aria-label="Twitter" href="#" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white"><path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.9-2.6 1.1A4 4 0 0 0 12 8.5c0 .3 0 .6.1.9A11.3 11.3 0 0 1 3 5.3a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.7-.5v.1c0 2 1.5 3.7 3.4 4.1-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.7 2.1 2.9 3.9 3a8 8 0 0 1-5 1.7H2A11.3 11.3 0 0 0 8.1 21c7.3 0 11.3-6 11.3-11.3v-.5c.8-.6 1.5-1.3 2.1-2.1Z" fill="currentColor"/></svg>
              </a>
              {/* Facebook */}
              <a aria-label="Facebook" href="#" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V12H8v3h2.5v6H14v-6h2.6l.4-3H14v-1.5c0-.3.2-.5.5-.5Z" fill="currentColor"/></svg>
              </a>
              {/* Instagram */}
              <a aria-label="Instagram" href="#" className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white"><path d="M16 2H8A6 6 0 0 0 2 8v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6Zm4 14a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8Zm-4-9a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 16 7Zm-4 1.5A4.5 4.5 0 1 0 16.5 13 4.51 4.51 0 0 0 12 8.5Zm0 7A2.5 2.5 0 1 1 14.5 13 2.5 2.5 0 0 1 12 15.5Z" fill="currentColor"/></svg>
              </a>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xl font-semibold">Information</h3>
            <ul className="mt-6 space-y-3 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-[#01d28e]">About</a></li>
              <li><a href="#" className="hover:text-[#01d28e]">Services</a></li>
              <li><a href="#" className="hover:text-[#01d28e]">Term and Conditions</a></li>
              <li><a href="#" className="hover:text-[#01d28e]">Best Price Guarantee</a></li>
              <li><a href="#" className="hover:text-[#01d28e]">Privacy & Cookies Policy</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold">Customer Support</h3>
            <ul className="mt-6 space-y-3 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-[#01d28e]">FAQ</a></li>
              <li><a href="#" className="hover:text-[#01d28e]">Payment Option</a></li>
              <li><a href="#" className="hover:text-[#01d28e]">Booking Tips</a></li>
              <li><a href="#" className="hover:text-[#01d28e]">How it works</a></li>
              <li><a href="#" className="hover:text-[#01d28e]">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold">Have a Questions?</h3>
            <ul className="mt-6 space-y-5 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex w-5 h-5 items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#01d28e]"><path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8Zm0 10.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" fill="currentColor"/></svg>
                </span>
                <span>203 Fake St. Mountain<br/>View, San Francisco,<br/>California, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex w-5 h-5 items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#01d28e]"><path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1 .4 2 .7 3.2.7.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2C10.7 21.2 2.8 13.3 2.8 3.2 2.8 2.5 3.3 2 4 2h2.9c.7 0 1.2.5 1.2 1.2 0 1.1.2 2.1.7 3.2.2.4.1.9-.2 1.2l-2 2.2Z" fill="currentColor"/></svg>
                </span>
                <a href="tel:+23923929210" className="hover:text-[#01d28e]">+2 392 3929 210</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex w-5 h-5 items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#01d28e]"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 3.2-8 5.3L4 7.2V6l8 5.3L20 6v1.2Z" fill="currentColor"/></svg>
                </span>
                <a href="mailto:info@yourdomain.com" className="hover:text-[#01d28e]">info@yourdomain.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}