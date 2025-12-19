import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import AdminUserDetails from '../AdminComponents/AdminUserDetails.jsx'
import { selectAllUsers, selectUsersLoading, selectUsersError, fetchUsersThunk, updateUserByIdThunk, deleteUserByIdThunk } from '../feetures/UserSlices.js'

export default function AdminUsersTable() {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const loading = useSelector(selectUsersLoading)
  const error = useSelector(selectUsersError)
  const [selected, setSelected] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null) // user object

  useEffect(() => { dispatch(fetchUsersThunk()) }, [dispatch])

  const onToggleDriver = (u) => {
    const id = u.id || u._id
    dispatch(updateUserByIdThunk({ id, updates: { isDriver: !u.isDriver } }))
      .unwrap()
      .then((updated) => {
        toast.success(`${updated?.username || u.username}: Driver ${!u.isDriver ? 'enabled' : 'disabled'}`)
      })
      .catch((e) => {
        const msg = e?.message || e?.payload?.message || 'Failed to update driver status'
        toast.error(msg)
      })
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
                <td className="px-3 sm:px-4 py-2 sm:py-3 relative">
                  {/* Desktop / tablet: inline buttons */}
                  <div className="hidden sm:flex flex-wrap gap-2 items-center">
                    <button className="btn btn-secondary" onClick={() => setSelected(u)}>View</button>
                    <button className="btn" onClick={() => setEditTarget(u)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => setConfirmDelete(u)} disabled={loading}>Delete</button>
                    <button className="btn btn-primary" onClick={() => onToggleDriver(u)} disabled={loading}>
                      {u.isDriver ? 'Set Driver: Off' : 'Set Driver: On'}
                    </button>
                  </div>
                  {/* Mobile: kebab menu */}
                  <div className="sm:hidden relative inline-block">
                    <button
                      className="btn"
                      aria-haspopup="menu"
                      aria-expanded={openMenuId === (u.id || u._id)}
                      onClick={(e) => {
                        e.stopPropagation()
                        const id = u.id || u._id
                        setOpenMenuId(prev => prev === id ? null : id)
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation()
                        const id = u.id || u._id
                        setOpenMenuId(prev => prev === id ? null : id)
                      }}
                    >⋮</button>
                    {openMenuId === (u.id || u._id) && (
                      <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} aria-hidden="true" />
                      <div className="absolute right-2 top-full mt-2 z-50 w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-2"
                           role="menu" onMouseLeave={() => setOpenMenuId(null)}>
                        <button className="w-full btn btn-secondary !justify-start" onClick={() => { setSelected(u); setOpenMenuId(null) }}>View</button>
                        <button className="w-full btn !justify-start" onClick={() => { setEditTarget(u); setOpenMenuId(null) }}>Edit</button>
                        <button className="w-full btn btn-danger !justify-start" onClick={() => { setOpenMenuId(null); setConfirmDelete(u) }} disabled={loading}>Delete</button>
                        <button className="w-full btn btn-primary !justify-start" onClick={() => { onToggleDriver(u); setOpenMenuId(null) }} disabled={loading}>
                          {u.isDriver ? 'Set Driver: Off' : 'Set Driver: On'}
                        </button>
                      </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminUserDetails user={selected} onClose={() => setSelected(null)} />

      {/* Edit modal */}
      {editTarget && (
        <div className="fixed inset-0 z-[1000] grid place-items-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setEditTarget(null)} />
          <div className="relative z-[1001] w-[95%] max-w-lg rounded-2xl bg-white text-gray-900 shadow-2xl ring-1 ring-black/10 p-5 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="heading-3">Edit User</h3>
              <button className="btn" onClick={() => setEditTarget(null)}>Close</button>
            </div>
            <EditUserForm user={editTarget} onSubmit={async (vals) => {
              const id = editTarget.id || editTarget._id
              dispatch(updateUserByIdThunk({ id, updates: vals }))
                .unwrap()
                .then((res) => { setEditTarget(null); toast.success('User updated') })
                .catch((e) => toast.error(e?.message || e?.payload?.message || 'Failed to update user'))
            }} />
          </div>
        </div>
      )}

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[1000] grid place-items-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setConfirmDelete(null)} />
          <div className="relative z-[1001] w-[95%] max-w-md rounded-2xl bg-white text-gray-900 shadow-2xl ring-1 ring-black/10 p-5 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="heading-3">Delete User</h3>
              <button className="btn" onClick={() => setConfirmDelete(null)}>Close</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete <span className="font-semibold">{confirmDelete.username}</span>? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button className="btn" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => {
                const id = confirmDelete.id || confirmDelete._id
                dispatch(deleteUserByIdThunk(id))
                  .unwrap()
                  .then(() => { toast.success('User deleted'); setConfirmDelete(null) })
                  .catch((e) => toast.error(e?.message || e?.payload?.message || 'Failed to delete user'))
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EditUserForm({ user, onSubmit }) {
  const [form, setForm] = useState({
    username: user?.username || '',
    phone: user?.phone || '',
    isDriver: !!user?.isDriver,
    isAdmin: !!user?.isAdmin,
  })
  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(form) }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <div className="text-sm text-gray-600">Username</div>
          <input className="input w-full" value={form.username} onChange={(e)=>setForm({ ...form, username: e.target.value })} />
        </label>
        <label className="block">
          <div className="text-sm text-gray-600">Phone</div>
          <input className="input w-full" value={form.phone} onChange={(e)=>setForm({ ...form, phone: e.target.value })} />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={form.isDriver} onChange={(e)=>setForm({ ...form, isDriver: e.target.checked })} />
          <span>Driver</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={form.isAdmin} onChange={(e)=>setForm({ ...form, isAdmin: e.target.checked })} />
          <span>Admin</span>
        </label>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" className="btn" onClick={()=>onSubmit(form)}>Save</button>
      </div>
    </form>
  )
}
