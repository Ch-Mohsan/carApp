import React, { useMemo, useEffect, useState } from 'react'
import PageTransition from '../components/PageTransition'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../feetures/UserSlices.js'
import { selectAllBookings, selectBookingsLoading, selectBookingsError, fetchAllBookingsThunk, driverRejectBookingThunk } from '../feetures/bookingSlice.js'
import { selectAllCars, fetchCarsThunk } from '../feetures/carsSlices.js'
import BookingDetailsModal from '../components/BookingDetailsModal'
import Alert from '../components/Alert'
import { toast } from 'react-toastify'

export default function Rides() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const bookings = useSelector(selectAllBookings)
  const loading = useSelector(selectBookingsLoading)
  const error = useSelector(selectBookingsError)
  const cars = useSelector(selectAllCars)
  const [viewTarget, setViewTarget] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [menuPos, setMenuPos] = useState(null)

  useEffect(() => {
    dispatch(fetchAllBookingsThunk())
    dispatch(fetchCarsThunk())
  }, [dispatch])

  const byCarId = useMemo(() => Object.fromEntries((cars||[]).map(c => [c.id, c])), [cars])

  const myAssigned = useMemo(() => {
    const uid = currentUser?.id || currentUser?._id
    return (bookings||[])
      .filter(b => String(b.driverId||'') === String(uid||'') && b.status === 'confirmed')
      .map(b => ({ ...b, id: b.id || b._id }))
  }, [bookings, currentUser])

  const fmt = (d) => {
    if (!d) return '—'
    try {
      const dt = new Date(d)
      const y = dt.getFullYear()
      const m = String(dt.getMonth()+1).padStart(2,'0')
      const dd = String(dt.getDate()).padStart(2,'0')
      const hh = String(dt.getHours()).padStart(2,'0')
      const mm = String(dt.getMinutes()).padStart(2,'0')
      return `${y}-${m}-${dd} ${hh}:${mm}`
    } catch { return String(d) }
  }

  const openDropdown = (e, id) => {
    e.preventDefault(); e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect()
    const MENU_W = 176
    const left = Math.max(8, Math.min(rect.right - MENU_W, window.innerWidth - MENU_W - 8))
    const top = Math.min(window.innerHeight - 200, rect.bottom + 6)
    setMenuPos({ top, left })
    setOpenMenuId(prev => prev === id ? null : id)
  }

  const onReject = async (b) => {
    try {
      await dispatch(driverRejectBookingThunk(b.id)).unwrap()
      toast.warn('Ride rejected. Admin will reassign.')
    } catch (e) {
      toast.error(typeof e === 'string' ? e : (e?.message || 'Failed to reject'))
    }
  }

  return (
    <PageTransition>
      <section className="relative w-full min-h-screen py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="heading-2">My Rides</h1>
            <p className="paragraph mt-2">Assigned bookings for you</p>
          </div>

          {loading && <Alert type='info' className='mb-4'>Loading rides…</Alert>}
          {error && !loading && <Alert type='error' className='mb-4'>{String(error)}</Alert>}
          {!loading && !error && myAssigned.length === 0 && (
            <Alert type='warning'>No rides assigned yet.</Alert>
          )}

          <div className='rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-3 md:p-4'>
            <div className='overflow-x-auto'>
              <table className='table w-full min-w-[760px] text-gray-700'>
                <thead className='text-xs md:text-sm text-gray-600'>
                  <tr className='border-b border-gray-100'>
                    <th className='text-left px-4 py-3'>Customer</th>
                    <th className='text-left px-4 py-3'>Car</th>
                    <th className='text-left px-4 py-3'>Period</th>
                    <th className='text-right px-4 py-3'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 text-sm md:text-base'>
                  {myAssigned.map(b => {
                    const car = byCarId[b.carId]
                    return (
                      <tr key={b.id} className='hover:bg-gray-50/50'>
                        <td className='px-4 py-3 whitespace-nowrap'>{b.name} ({b.phone||'—'})</td>
                        <td className='px-4 py-3 whitespace-nowrap'>{car ? `${car.name}` : '—'}</td>
                        <td className='px-4 py-3 whitespace-nowrap'>{fmt(b.startDate||b.date)} → {fmt(b.endDate||b.date)}</td>
                        <td className='px-4 py-3 text-right'>
                          <div className='hidden md:inline-flex items-center gap-2'>
                            <button className='btn btn-secondary' onClick={() => setViewTarget(b.id)}>View</button>
                            <button className='btn btn-danger' onClick={() => onReject(b)}>Reject</button>
                          </div>
                          <div className='md:hidden inline-block'>
                            <button className='btn' onPointerDown={(e)=>openDropdown(e, b.id)} aria-haspopup='menu' aria-expanded={openMenuId===b.id}>⋮</button>
                            {openMenuId === b.id && (
                              <>
                                <div className='fixed inset-0 z-[1000]' onPointerDown={() => setOpenMenuId(null)} aria-hidden='true' />
                                <div className='fixed z-[1001] w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-2 flex flex-col gap-2' role='menu' style={{ top: (menuPos?.top ?? 60), left: (menuPos?.left ?? 60) }}>
                                  <button className='w-full btn btn-secondary !justify-start !py-2 !px-3' onClick={() => { setViewTarget(b.id); setOpenMenuId(null) }}>View</button>
                                  <button className='w-full btn btn-danger !justify-start !py-2 !px-3' onClick={() => { onReject(b); setOpenMenuId(null) }}>Reject</button>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {viewTarget && (() => {
            const booking = myAssigned.find(x => String(x.id) === String(viewTarget))
            const car = booking ? byCarId[booking.carId] : null
            return (
              <div className='modal'>
                <div className='modal-content max-w-xl w-[92vw] p-5 md:p-6'>
                  <BookingDetailsModal booking={booking} car={car} onClose={() => setViewTarget(null)} />
                </div>
              </div>
            )
          })()}

        </div>
      </section>
    </PageTransition>
  )
}
