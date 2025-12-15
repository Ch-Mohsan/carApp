import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBookingsThunk, confirmBookingThunk, updateBookingThunk, deleteBookingThunk, selectAllBookings, selectBookingsLoading, selectBookingsError } from '../feetures/bookingSlice'
import { selectAllCars, fetchCarsThunk } from '../feetures/carsSlices'
import BookingDetailsModal from '../components/BookingDetailsModal'
import { getAllUsers, updateUserById, getUserById } from '../data/api'
import { toast } from 'react-toastify'

export default function AdminBookingsTable() {
  const dispatch = useDispatch()
  const bookings = useSelector(selectAllBookings)
  const loading = useSelector(selectBookingsLoading)
  const error = useSelector(selectBookingsError)
  const cars = useSelector(selectAllCars)

  const [viewTarget, setViewTarget] = useState(null)
  const [confirmTarget, setConfirmTarget] = useState(null)
  const [selectedDriverId, setSelectedDriverId] = useState('')
  const [drivers, setDrivers] = useState([])
  const menuRef = useRef(null)
  const [editTarget, setEditTarget] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)

  const fmt = (d) => {
    if (!d) return '—'
    try {
      const iso = typeof d === 'string' ? d : new Date(d).toISOString()
      return iso.slice(0,10)
    } catch {
      try { return new Date(d).toISOString().slice(0,10) } catch { return String(d) }
    }
  }

  const byCarId = useMemo(() => Object.fromEntries((cars||[]).map(c => [c.id, c])), [cars])
  const byDriverId = useMemo(() => Object.fromEntries((drivers||[]).map(d => [String(d.id||d._id), d])), [drivers])

  const refreshDrivers = async () => {
    try {
      const res = await getAllUsers()
      const list = Array.isArray(res?.users) ? res.users : []
      const ds = list
        .map(u => ({ ...u, id: u.id || u._id }))
        .filter(u => !!u.isDriver)
      setDrivers(ds)
    } catch (e) {
      setDrivers([])
    }
  }

  useEffect(() => { dispatch(fetchAllBookingsThunk()) }, [dispatch])
  useEffect(() => {
    if (!cars || cars.length === 0) dispatch(fetchCarsThunk())
  }, [dispatch])
  useEffect(() => { refreshDrivers() }, [])
  // Fallback: ensure assigned drivers are loaded even if not in the initial drivers list
  useEffect(() => {
    const loadMissingDrivers = async () => {
      const ids = Array.from(new Set((bookings||[]).map(b => b.driverId).filter(Boolean).map(String)))
      const have = new Set((drivers||[]).map(d => String(d.id||d._id)))
      for (const id of ids) {
        if (!have.has(id)) {
          try {
            const res = await getUserById(id)
            const u = res?.user
            if (u) setDrivers(prev => [...prev, { ...u, id: u.id || u._id }])
          } catch {}
        }
      }
    }
    loadMissingDrivers()
  }, [bookings, drivers])

  // no kebab menu anymore; direct action buttons

  const onConfirm = async () => {
    if (!confirmTarget || !selectedDriverId) return
    try {
      await dispatch(confirmBookingThunk({ id: confirmTarget, driverId: selectedDriverId })).unwrap()
      await updateUserById(selectedDriverId, { isAvailable: false })
      await refreshDrivers()
    } finally {
      setConfirmTarget(null)
      setSelectedDriverId('')
    }
  }

  return (
    <div>
      {loading && <div className='alert info'>Loading bookings…</div>}
      {error && !loading && <div className='alert error'>{String(error)}</div>}
      <div className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-3 md:p-4'>
        <div className='overflow-x-auto'>
          <table className='table w-full min-w-[760px] text-gray-700'>
            <thead className='text-xs md:text-sm text-gray-600'>
              <tr className='border-b border-gray-100'>
                <th className='text-left px-4 py-3'>Customer</th>
                <th className='text-left px-4 py-3'>Phone</th>
                <th className='text-left px-4 py-3'>Car</th>
                <th className='text-left px-4 py-3'>Driver</th>
                <th className='text-right px-4 py-3'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 text-sm md:text-base'>
              {(bookings||[]).map(b => {
                const car = byCarId[b.carId]
                return (
                  <tr key={b.id} className='hover:bg-gray-50/50'>
                    <td className='px-4 py-3 whitespace-nowrap'>{b.name}</td>
                    <td className='px-4 py-3 whitespace-nowrap'>{b.phone || '—'}</td>
                    <td className='px-4 py-3 whitespace-nowrap'>{car ? car.name : '—'}</td>
                    <td className='px-4 py-3 whitespace-nowrap'>
                      {(() => {
                        if (b.driverId) {
                          const d = byDriverId[String(b.driverId)]
                          if (d) {
                            return (
                              <span className='inline-flex items-center gap-2'>
                                <span>{d.username}{d.phone ? ` (${d.phone})` : ''}</span>
                                <span className={`badge ${d.isAvailable ? 'badge-success' : 'badge-warning'}`}>{d.isAvailable ? 'Available' : 'Busy'}</span>
                              </span>
                            )
                          }
                          return 'Assigned'
                        }
                        return b.isDriver ? 'Required' : '—'
                      })()}
                    </td>
                    <td className='px-4 py-3 text-right'>
                      {/* Desktop actions */}
                      <div className='hidden md:inline-flex items-center gap-2'>
                        <button className='btn btn-secondary' onClick={() => setViewTarget(b.id)}>View</button>
                        <button className='btn' onClick={() => setEditTarget(b)}>Edit</button>
                        <button className='btn btn-danger' onClick={() => setConfirmDelete(b)}>Delete</button>
                        <button className='btn btn-primary' disabled={b.status !== 'pending' || !!b.driverId} onClick={() => setConfirmTarget(b.id)}>Confirm</button>
                      </div>
                      {/* Mobile kebab */}
                      <div className='md:hidden relative inline-block'>
                        <button className='btn' onClick={() => setOpenMenuId(p => p === b.id ? null : b.id)} aria-haspopup='menu' aria-expanded={openMenuId===b.id}>⋮</button>
                        {openMenuId === b.id && (
                          <div className='absolute right-0 mt-2 z-20 w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-2' role='menu'>
                            <button className='w-full btn btn-secondary !justify-start' onClick={() => { setViewTarget(b.id); setOpenMenuId(null) }}>View</button>
                            <button className='w-full btn !justify-start' onClick={() => { setEditTarget(b); setOpenMenuId(null) }}>Edit</button>
                            <button className='w-full btn btn-danger !justify-start' onClick={() => { setConfirmDelete(b); setOpenMenuId(null) }}>Delete</button>
                            <button className='w-full btn btn-primary !justify-start' disabled={b.status !== 'pending' || !!b.driverId} onClick={() => { setConfirmTarget(b.id); setOpenMenuId(null) }}>Confirm</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {(!bookings || bookings.length === 0) && (
                <tr>
                  <td className='px-4 py-6 text-center text-gray-500' colSpan={4}>No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Refresh buttons removed per request */}

      {viewTarget && (() => {
        const booking = (bookings||[]).find(x => String(x.id) === String(viewTarget))
        const car = booking ? byCarId[booking.carId] : null
        return (
          <div className='modal'>
            <div className='modal-content max-w-xl w-[92vw] p-5 md:p-6'>
              <BookingDetailsModal booking={booking} car={car} onClose={() => setViewTarget(null)} />
            </div>
          </div>
        )
      })()}

      {confirmTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" onClick={() => { setConfirmTarget(null); setSelectedDriverId('') }} />
            <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-xl mx-4 md:mx-6 rounded-2xl bg-white ring-1 ring-gray-200 shadow-2xl text-black max-h-[85vh] overflow-auto p-5 md:p-6">
            <h3 className='heading-4 mb-3'>Assign Driver</h3>
            {(() => {
              const booking = (bookings||[]).find(x => String(x.id) === String(confirmTarget))
              const car = booking ? byCarId[booking.carId] : null
              if (!booking) return null
              return (
                <div className='mb-4 text-sm text-gray-700 space-y-2 rounded-lg bg-gray-50 p-3'>
                  <div><strong>Customer:</strong> {booking.name}</div>
                  <div><strong>Phone:</strong> {booking.phone || '—'}</div>
                  <div><strong>Car:</strong> {car ? car.name : '—'}</div>
                  <div><strong>Period:</strong> {fmt(booking.startDate||booking.date)} → {fmt(booking.endDate||booking.date)}</div>
                  <div><strong>Pickup/Dropoff:</strong> {booking.pickup} → {booking.dropoff}</div>
                </div>
              )
            })()}
            <label className='block text-sm mb-1'>Select available driver</label>
            <select className='input w-full mb-4' value={selectedDriverId} onChange={(e) => setSelectedDriverId(e.target.value)}>
              <option value=''>Choose driver…</option>
              {drivers
                .filter(d => d.isDriver && d.isAvailable)
                .map(d => (
                  <option key={d.id} value={d.id}>{d.username} {d.phone ? `(${d.phone})` : ''}</option>
                ))}
            </select>
            <div className='flex justify-end gap-2'>
              <button className='btn' onClick={() => { setConfirmTarget(null); setSelectedDriverId('') }}>Close</button>
              <button className='btn btn-primary' disabled={!selectedDriverId} onClick={onConfirm}>Confirm</button>
            </div>
            </div>
          </div>
      )}

      {/* Edit booking modal */}
      {editTarget && (() => {
        const b = editTarget
        const [form, setForm] = [editTarget._form || { name: b.name||'', phone: b.phone||'', pickup: b.pickup||'', dropoff: b.dropoff||'', startDate: (b.startDate||b.date||'').slice(0,16), endDate: (b.endDate||b.date||'').slice(0,16), instructions: b.instructions||'', fare: b.fare||'' }, null]
        // We'll implement as component inline for brevity
        return (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/30' onClick={() => setEditTarget(null)} />
            <div className='relative z-10 w-full max-w-xl mx-4 md:mx-6 rounded-2xl bg-white ring-1 ring-gray-200 shadow-2xl text-black max-h-[85vh] overflow-auto p-5 md:p-6'>
              <div className='flex items-center justify-between mb-3'>
                <h3 className='heading-4'>Edit Booking</h3>
                <button className='btn' onClick={() => setEditTarget(null)}>Close</button>
              </div>
              <form onSubmit={(e)=>{e.preventDefault();}} className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <label className='block text-sm'>
                  <span className='text-gray-600'>Customer</span>
                  <input className='input w-full' defaultValue={b.name||''} onChange={(e)=> b._form = { ...(b._form||{}), name: e.target.value }} />
                </label>
                <label className='block text-sm'>
                  <span className='text-gray-600'>Phone</span>
                  <input className='input w-full' defaultValue={b.phone||''} onChange={(e)=> b._form = { ...(b._form||{}), phone: e.target.value }} />
                </label>
                <label className='block text-sm'>
                  <span className='text-gray-600'>Pickup</span>
                  <input className='input w-full' defaultValue={b.pickup||''} onChange={(e)=> b._form = { ...(b._form||{}), pickup: e.target.value }} />
                </label>
                <label className='block text-sm'>
                  <span className='text-gray-600'>Dropoff</span>
                  <input className='input w-full' defaultValue={b.dropoff||''} onChange={(e)=> b._form = { ...(b._form||{}), dropoff: e.target.value }} />
                </label>
                <label className='block text-sm'>
                  <span className='text-gray-600'>Start</span>
                  <input type='datetime-local' className='input w-full' defaultValue={(b.startDate||'').slice(0,16)} onChange={(e)=> b._form = { ...(b._form||{}), startDate: e.target.value }} />
                </label>
                <label className='block text-sm'>
                  <span className='text-gray-600'>End</span>
                  <input type='datetime-local' className='input w-full' defaultValue={(b.endDate||'').slice(0,16)} onChange={(e)=> b._form = { ...(b._form||{}), endDate: e.target.value }} />
                </label>
                <label className='block text-sm md:col-span-2'>
                  <span className='text-gray-600'>Instructions</span>
                  <textarea className='input w-full' rows={3} defaultValue={b.instructions||''} onChange={(e)=> b._form = { ...(b._form||{}), instructions: e.target.value }} />
                </label>
                <label className='block text-sm'>
                  <span className='text-gray-600'>Fare</span>
                  <input type='number' className='input w-full' defaultValue={b.fare||''} onChange={(e)=> b._form = { ...(b._form||{}), fare: Number(e.target.value) }} />
                </label>
              </form>
              <div className='mt-4 flex justify-end gap-2'>
                <button className='btn' onClick={()=> setEditTarget(null)}>Cancel</button>
                <button className='btn btn-primary' onClick={async ()=>{
                  const updates = b._form || {}
                  try {
                    await dispatch(updateBookingThunk({ id: b.id, updates })).unwrap()
                    toast.success('Booking updated')
                    setEditTarget(null)
                  } catch(e) {
                    toast.error(typeof e === 'string' ? e : (e?.message || e?.payload?.message || 'Failed to update booking'))
                  }
                }}>Save</button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='absolute inset-0 bg-black/30' onClick={()=> setConfirmDelete(null)} />
          <div className='relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white ring-1 ring-gray-200 shadow-2xl p-5'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='heading-4'>Delete Booking</h3>
              <button className='btn' onClick={()=> setConfirmDelete(null)}>Close</button>
            </div>
            <p className='text-sm text-gray-600 mb-4'>Are you sure you want to delete this booking for <span className='font-semibold'>{confirmDelete.name}</span>?</p>
            <div className='flex justify-end gap-2'>
              <button className='btn' onClick={()=> setConfirmDelete(null)}>Cancel</button>
              <button className='btn btn-danger' onClick={async ()=>{
                try {
                  await dispatch(deleteBookingThunk(confirmDelete.id)).unwrap()
                  toast.success('Booking deleted')
                  setConfirmDelete(null)
                } catch(e) { toast.error(typeof e === 'string' ? e : (e?.message || e?.payload?.message || 'Failed to delete booking')) }
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
