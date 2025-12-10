import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import AdminUserDetails from './AdminUserDetails'
import { selectAllUsers, selectUsersLoading, selectUsersError, fetchUsersThunk, updateUserByIdThunk } from '../feetures/UserSlices.js'

export default function AdminUsersTable() {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const loading = useSelector(selectUsersLoading)
  const error = useSelector(selectUsersError)
  const [selected, setSelected] = useState(null)

  useEffect(() => { dispatch(fetchUsersThunk()) }, [dispatch])

  const onToggleDriver = (u) => {
    const id = u.id || u._id
    dispatch(updateUserByIdThunk({ id, updates: { isDriver: !u.isDriver } }))
      .unwrap()
      .then((updated) => { /* optimistic UI handled in slice */ })
      .catch(() => {})
  }

  const columns = useMemo(() => [
    { key: 'username', label: 'Username' },
    { key: 'phone', label: 'Phone' },
    { key: 'isDriver', label: 'Driver' },
  ], [])

  return (
    <div className="w-full max-w-full">

      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

      <div className="overflow-x-auto rounded-lg ring-1 ring-black/10 bg-white shadow">
        <table className="min-w-full text-xs sm:text-sm table-auto">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {columns.map(c => (
                <th key={c.key} className="text-left px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 whitespace-nowrap">{c.label}</th>
              ))}
              <th className="px-3 sm:px-4 py-2 sm:py-3"/>
            </tr>
          </thead>
          <tbody>
            {(users||[]).map(u => (
              <tr key={u.id || u._id} className="border-t border-gray-100">
                <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{u.username}</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{u.phone || '—'}</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{u.isDriver ? 'Active' : 'Inactive'}</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <button className="btn btn-secondary w-full sm:w-auto" onClick={() => setSelected(u)}>View</button>
                    <button className="btn btn-primary w-full sm:w-auto" onClick={() => onToggleDriver(u)} disabled={loading}>
                      {u.isDriver ? 'Set Driver: Off' : 'Set Driver: On'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminUserDetails user={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
