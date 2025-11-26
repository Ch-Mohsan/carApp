import React from 'react';

// Side-by-side: image left (on top visually), content right expanded 20% width & height and overlapped under the image.
export default function AboutSection() {
  return (
   <section className='w-full h-fit  bg-white flex flex-col md:flex-row items-center relative text-white text-lg'>
    <div className='w-1/2 h-1/2 md:h-[80%] px-8  '>
    <img src="/images/about.jpg" alt="" className='w-[50%] h-[480px] object-cover shadow-2xl absolute  top-[90px]  z-20' />
    </div>
    <div className='w-full md:w-[70%] h-1/2 md:h-screen bg-[#01d28e] absolute right-[10px] top[50%] md:top-[100%]    '>
    <div className='w-[60%] h-full flex flex-col   py-4 gap-4  absolute  right-[30px]'>
        <h2 className='text-2xl font-semibold text-white '>About us</h2>
        <h1 className='text-3xl font-semibold py-3'>Well Come to Rent A Car </h1>
        <p  className='text-sm text-wrap p-2 leading-7'>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
        <p className='text-sm text-wrap p-2 leading-7'>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
        
        <button className='text-lg p-3 w-[150px] text-center bg-[#1089ff] text-white '>Search Vehicle</button>
    </div>
    </div>

   </section>
  );
}