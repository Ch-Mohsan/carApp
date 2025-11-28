import React, { useState } from 'react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => { e.preventDefault(); /* TODO: handle auth */ }

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-[#1089ff] text-white px-6 py-5">
          <div className="text-2xl font-extrabold tracking-tight">
            <span>CAR</span>
            <span className="text-[#01d28e] ml-1">BOOK</span>
          </div>
          <p className="text-white/90 text-sm mt-1">Welcome back! Sign in to continue.</p>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-6">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            className="mt-1 mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1089ff]"
            placeholder="you@example.com"
          />

          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            className="mt-1 mb-6 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1089ff]"
            placeholder="••••••••"
          />

          <button type="submit" className="w-full bg-[#1089ff] hover:bg-[#0d75db] text-white font-semibold py-2.5 rounded-md">Sign In</button>

          <div className="mt-4 text-sm text-center">
            <a href="/" className="text-[#1089ff] hover:underline">Back to Home</a>
          </div>
        </form>
      </div>
    </section>
  )
}