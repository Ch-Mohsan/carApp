import React from 'react'

function Hero() {
  return (
    <section className="hero-section relative">
      <div className="w-full min-h-[680px] flex flex-col text-center items-center justify-center text-white py-24 hero-content-padding">
        <h1 className="font-extrabold text-[44px] mb-4 leading-12">Fast & Easy Way To Rent A Car</h1>
        <p className="hidden md:block text-lg max-w-2xl">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts</p>
        <p className="md:hidden text-lg px-8">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts</p>
        <p className="text-lg mt-4"><span>_____</span>Easy Steps for renting a car</p>
      </div>

      {/* Overlapping panels: left booking panel + right content card. */}
     <div className='absolute left-0 right-0 bottom-0 top-[70%] w-full h-[70%] bg-[#99999999]  flex justify-center  px-8 '>
      <div className='h-[90%] w-[30%] bg-[#1089ff] rounded-lg flex flex-col justify-around text-white gap-2 px-8 py-12 '>
        <h1 className='text-xl font-bold'>Make your trip</h1>
        <label htmlFor="">Pick-up location</label>
        <input className='w-full outline-none border-md border-[1px] py-1 text-justify' type="text" />
        <label htmlFor="">Drop-off location</label>
        <input className='w-full outline-none border-md border-[1px] py-1 text-justify' type="text" />
        <div className='w-full grid grid-cols-2 gap-4'>
          <label htmlFor="">Pick-up date</label>
        <label htmlFor="">Drop-off date</label>
        <input type="date"  placeholder='City, Airport, Station, etc 'className='border-[1px] border-white text-center decoration-none'  />
        <input type="date" placeholder='City, Airport, Station, etc 'className='border-[1px] border-white text-center decoration-none p-1 outline-none'  />
        </div>
        <label htmlFor="">Pick up Time</label>
        <input type="time" className='border-[1px] border-white outline-none text-center p-1' />
      <button className='px-2 py-4 text-white bg-[#01d28e] '>
        Rent A Car Now
      </button>
      </div>
      <div className='h-[70%] w-[60%] bg-white rounded-lg mt-8 text-black flex flex-col justify-evenly px-12 ' >

     <p className='text-2xl font-bold'>Better Way to Rent Your Perfect Cars</p>
     <div className='w-full flex justify-evenly'>
       <div className='flex flex-col items-center justify-center gap-4'>
        {/* react location i con */}
        <div className='bg-[#1089ff33] p-4 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1089ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
        </div>
        <p className='font-semibold'>Choose Your Pickup Location</p>
       </div>
       <div>
        {/* Select the Best Deal*/}
        <div className='bg-[#1089ff33] p-4 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1089ff] text-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2h-1a3 3 0 00-3-3H7a3 3 0 00-3 3H3z" />      
</svg>
        </div>
        <p className='font-semibold'>Select the Best Deal</p>   
       </div>
        {/* Reserve Your Rental Car */}
        <div>
        <div className='bg-[#1089ff33] p-4 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1089ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m0 0l-6-6m6 6H3" />
</svg>
        </div>
        <p className='font-semibold'>Reserve Your Rental Car</p>  
        </div>
     </div>
        <button className='p-4 text-center bg-[#1089ff] text-white  w-fit not-[]: '>Reserve Your Perfect Car</button>
      </div>
     </div>
    </section>
  )
}

export default Hero