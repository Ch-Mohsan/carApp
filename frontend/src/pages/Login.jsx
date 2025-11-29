import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers, signupUser, loginUser } from '../feetures/UserSlices.js'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const [searchParams] = useSearchParams()
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login'
  const [activeTab, setActiveTab] = useState(initialMode) // 'login' or 'register'
  const [form, setForm] = useState({ username: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const validatePhone = (v) => /^\+?[0-9\-\s]{7,15}$/.test(v)
  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.username.trim()) { setError('Username is required.'); return }
    if (!form.password || form.password.length < 6) { setError('Password must be at least 6 characters.'); return }

    if (activeTab === 'register') {
      if (!validatePhone(form.phone)) { setError('Please enter a valid phone number.'); return }
      const exists = users.some(u => u.username === form.username)
      if (exists) { setError('User already exists. Try logging in.'); return }
      dispatch(signupUser({ username: form.username.trim(), phone: form.phone.trim(), password: form.password, isAdmin: false, isDriver: false }))
      navigate('/home')
      return
    }

    const found = users.find(u => u.username === form.username && u.password === form.password)
    if (!found) { setError('Invalid credentials.'); return }
    dispatch(loginUser({ username: form.username.trim(), password: form.password }))
    console.log("............",users)
    navigate('/home')
  }

  // React to query param changes if user navigates between modes via URL
  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'register' && activeTab !== 'register') setActiveTab('register')
    if (mode === 'login' && activeTab !== 'login') setActiveTab('login')
  }, [searchParams, activeTab])

  return (
    <section
      className='relative w-full min-h-screen flex items-center justify-center px-4 py-10 md:py-16'
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(16,137,255,0.12) 0%, rgba(16,137,255,0.25) 35%, rgba(0,0,0,0.35) 100%), url(/images/bg_1.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='absolute inset-0 bg-black/20' />

      <div className='relative w-full max-w-sm md:max-w-md'>
        <div className='rounded-2xl bg-transparent backdrop-blur-md shadow-xl ring-1 ring-white/20 p-6 md:p-7 h-screen md:h-[85vh] flex flex-col'>
          <div className='flex items-center gap-3 mb-6'>
            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1089ff] text-white shadow-md'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
                <path d='M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z' />
              </svg>
            </span>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
                {activeTab === 'login' ? 'Welcome Back' : 'Create Your Account'}
              </h1>
              <p className='text-sm md:text-base text-gray-600'>
                {activeTab === 'login' ? 'Sign in to manage bookings and explore more.' : 'Register to start booking your favorite cars.'}
              </p>
            </div>
          </div>

       

          {error && (
            <div className='mb-4 flex items-center gap-2 rounded-md bg-red-50 text-red-700 px-3 py-2 border border-red-100'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                <path d='M11 7h2v6h-2z' /><path d='M11 15h2v2h-2z' /><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
              </svg>
              <span className='text-sm'>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className='space-y-3 flex-1'>
            <div>
              <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username</label>
              <div className='mt-2 relative'>
                <span className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
                    <path d='M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z' />
                  </svg>
                </span>
                <input
                  id='username'
                  name='username'
                  type='text'
                  value={form.username}
                  onChange={onChange}
                  className='w-full rounded-lg border border-white/50 bg-white/20 text-black placeholder-black/70 pl-10 pr-3 py-2.5 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30'
                  placeholder='your username'
                  required
                />
              </div>
            </div>

            {activeTab === 'register' && (
              <div>
                <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Phone number</label>
                <div className='mt-2 relative'>
                  <span className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
                      <path d='M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.29 22 2 13.71 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z' />
                    </svg>
                  </span>
                  <input
                    id='phone'
                    name='phone'
                    type='tel'
                    value={form.phone}
                    onChange={onChange}
                    className='w-full rounded-lg border border-white/50 bg-white/20 text-black placeholder-black/70 pl-10 pr-3 py-2.5 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30'
                    placeholder='+1 555 123 4567'
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
              <div className='mt-2 relative'>
                <span className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
                    <path d='M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-8-3a3 3 0 116 0v3H10V7z' />
                  </svg>
                </span>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={form.password}
                  onChange={onChange}
                  className='w-full rounded-lg border border-white/50 bg-white/20 text-black placeholder-black/70 pl-10 pr-3 py-2.5 outline-none focus:border-[#1089ff] focus:ring-2 focus:ring-[#1089ff]/30'
                  placeholder='••••••••'
                  required
                />
              </div>
            </div>

            <div className='mt-4 flex items-center gap-3'>
              <button className='flex-1 p-3 bg-[#1089ff] text-white text-lg rounded-lg hover:bg-[#0d75db] shadow-md shadow-[#1089ff]/20 transition-colors'>
                {activeTab === 'login' ? 'Log In' : 'Register'}
              </button>
              {activeTab === 'login' ? (
                <button
                  type='button'
                  className='px-4 py-3 rounded-lg border border-white/40 bg-white/20 text-[#1089ff] hover:bg-white/30'
                  onClick={() => setActiveTab('register')}
                >
                  Register
                </button>
              ) : (
                <button
                  type='button'
                  className='px-4 py-3 rounded-lg border border-white/40 bg-white/20 text-[#1089ff] hover:bg-white/30'
                  onClick={() => setActiveTab('login')}
                >
                  Log In
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}