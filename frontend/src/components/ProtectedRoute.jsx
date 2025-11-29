import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../feetures/UserSlices.js'

// Wrap routes that require authentication
export default function ProtectedRoute() {
  const currentUser = useSelector(selectCurrentUser)
  if (!currentUser) return <Navigate to="/login" replace />
  return <Outlet />
}
