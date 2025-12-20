import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../feetures/UserSlices.js'

// Wrap routes that require authentication
export default function ProtectedRoute() {
  const currentUser = useSelector(selectCurrentUser)
  const location = useLocation()
  if (!currentUser) return <Navigate to="/login" replace />
  // If admin, force them to Dashboard no matter what
  if (currentUser?.isAdmin && location.pathname !== '/dashboard') {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
