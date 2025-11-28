import React, { useState } from 'react'

export default function Login() {
  const [activeTab, setActiveTab] = useState('login') // 'login' or 'register'
  const [form, setForm] = useState({ email: '', password: '' })
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => { e.preventDefault(); /* TODO: handle auth */ }

  return (
    <section className='w-full h-screen flex   items-center md:justify-around justify-center bg-gray-200'>

      <div className=' hidden w-full md:w-1/2 h-[90%]  shadow-lg   md:block '>
        <img src="/images/car-3.jpg" alt="" className='w-full h-full object-cover rounded-lg' />
      </div>
      <div  className='md:w-[40%] md:h-[90%] flex  py-10 p-10 flex-col shadow-lg bg-white  rounded-lg '>
        <div className='flex justify-start items-baseline mb-2 gap-6  text-3xl  '> 
          <a href="/login"  className={`${activeTab === 'login' ? 'text-[#1089ff]' : 'text-black'}`} onClick={()=>{setActiveTab('login')}}>Login</a>
          <a href="/register" className={`${activeTab === 'register' ? 'text-[#1089ff]' : 'text-black'}`} onClick={()=>{setActiveTab('register')}}>Register</a>
        </div>
        <hr className=' text-gray-200 mb-10'  />
      <h1 className='mb-6 text-2xl font-bold'>Wellcom Back</h1>
      <p className='pb-4 text-lg'>Sign in to access your account and bookings.</p>
      <form onSubmit={onSubmit} className='flex flex-col h-auto    '>
        <label htmlFor="email">Email Address</label>
        <input type="text" className='w-full p-2 my-6 outline-none rounded-lg border-[1px] border-gray-400' />
        <label htmlFor="password">Password</label>
        <input type="text" className='w-full py-2 my-6 outline-none  rounded-lg   border-[1px] border-gray-400' />
        <button className='w-full p-4 bg-[#01d28e] text-white text-lg rounded-lg pointer-coarse hover:opacity-80 hover:text-[#1089ff]'>Log In</button>
      </form>
      </div>

    </section>
  )
}