import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUserWithRoles } from '../feetures/UserSlices.js'

export default function AdminSidebar() {
  const user = useSelector(selectCurrentUserWithRoles)
  const isAdmin = !!(user && user.isAdmin)
  const { pathname } = useLocation()
  if (!isAdmin) return null

  const Icon = ({ name }) => {
    const base = 'h-5 w-5'
    switch (name) {
      case 'home':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
            <path d="M12 3.25l9 7.5v9a.75.75 0 01-.75.75h-5.5a.75.75 0 01-.75-.75v-5.5h-3v5.5a.75.75 0 01-.75.75H3.75A.75.75 0 013 19.75v-9l9-7.5z" />
          </svg>
        )
      case 'plus':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
            <path d="M12 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.75v5.75a.75.75 0 01-1.5 0V12.5H5.5a.75.75 0 010-1.5h5.75V5.25A.75.75 0 0112 4.5z" />
          </svg>
        )
      case 'car':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
            <path d="M3 13l2.5-6A2 2 0 017.4 5h9.2a2 2 0 011.9 2l2.5 6v5a1 1 0 01-1 1h-1a2 2 0 01-2-2v-1H6v1a2 2 0 01-2 2H3a1 1 0 01-1-1v-5zm4.5 0h9l-1.8-4.5a1 1 0 00-.93-.63H10.23a1 1 0 00-.93.63L7.5 13zM7 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        )
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
            <path d="M7 2.75a.75.75 0 01.75.75v1h8.5v-1a.75.75 0 011.5 0v1H19a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2v-12a2 2 0 012-2h.25v-1A.75.75 0 017 2.75zM5 8v10h14V8H5z" />
          </svg>
        )
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0v1H5v-1z" />
          </svg>
        )
      case 'driver':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={base}>
            <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-3l1.5 3h-2l-1.5-3h-5l-1.5 3h-2L7 17H6a2 2 0 01-2-2V6zm2 1v6h12V7H6z" />
          </svg>
        )
      default:
        return null
    }
  }

  const Item = ({ to, label, icon }) => {
    const active = pathname === to
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-[#01d28e]/10 text-[#01d28e] ring-1 ring-[#01d28e]/20' : 'text-gray-700 hover:bg-gray-50'}`}
      >
        <span className="text-[#01d28e]" aria-hidden><Icon name={icon} /></span>
        <span className="text-sm font-medium">{label}</span>
      </Link>
    )
  }

  return (
    <aside
      className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-4 sticky top-[calc(var(--header-height)+16px)]"
      style={{ height: 'calc(100vh - var(--header-height) - 16px)' }}
      aria-label="Admin Navigation"
    >
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-900">Admin Panel</h3>
        <p className="text-xs text-gray-500">Quick actions and records</p>
      </div>
      <nav className="flex flex-col gap-2">
        <Item to="/dashboard" label="Overview" icon="home" />
        <Item to="/admin/cars/new" label="Add New Car" icon="plus" />
        <Item to="/admin/cars" label="Cars Listing" icon="car" />
        <Item to="/admin/bookings" label="Booking Records" icon="calendar" />
        <Item to="/admin/users" label="User Records" icon="user" />
        <Item to="/admin/drivers" label="Driver Status" icon="driver" />
      </nav>
    </aside>
  )
}
