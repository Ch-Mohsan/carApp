import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { selectAllUsers, selectUsersLoading, selectUsersError, fetchUsersThunk } from '../feetures/UserSlices.js'
import { selectAllBookings, fetchAllBookingsThunk } from '../feetures/bookingSlice.js'
import { selectAllCars, fetchCarsThunk } from '../feetures/carsSlices.js'
import BookingDetailsModal from '../components/BookingDetailsModal'

export default function AdminDriversTable() {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const bookings = useSelector(selectAllBookings)
  const cars = useSelector(selectAllCars)
  const loading = useSelector(selectUsersLoading)
  const error = useSelector(selectUsersError)

  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    dispatch(fetchUsersThunk())
    dispatch(fetchAllBookingsThunk())
    dispatch(fetchCarsThunk())
  }, [dispatch])

  const carsById = useMemo(() => Object.fromEntries((cars||[]).map(c => [String(c.id), c])), [cars])
  const nowISO = useMemo(() => new Date().toISOString(), [])

  const drivers = useMemo(() => (users||[]).filter(u => !!u.isDriver), [users])

  const driverRows = useMemo(() => {
    return drivers.map(d => {
      const matches = (bookings||[])
        .filter(b => String(b.driverId) === String(d.id || d._id) && (b.status === 'confirmed' || b.status === 'pending'))
        .sort((a,b) => String(b.endDate||b.date).localeCompare(String(a.endDate||a.date)))
      const activeBooking = matches[0] || null
      const status = typeof d.isAvailable === 'boolean' ? (d.isAvailable ? 'available' : 'booked') : (activeBooking ? 'booked' : 'available')
      return { driver: d, activeBooking, status }
    })
  }, [drivers, bookings])

  return (
    <div className='w-full max-w-full'>
      {error && <div className='text-red-600 text-sm mb-2'>{error}</div>}
      <div className='overflow-x-auto rounded-lg ring-1 ring-black/10 bg-white shadow'>
        <table className='min-w-full text-xs sm:text-sm table-auto'>
          <thead className='bg-gray-50 sticky top-0 z-10'>
            <tr>
              <th className='text-left px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 whitespace-nowrap'>Name</th>
              <th className='text-left px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 whitespace-nowrap'>Phone</th>
              <th className='text-left px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 whitespace-nowrap'>Status</th>
              <th className='px-3 sm:px-4 py-2 sm:py-3' />
            </tr>
          </thead>
          <tbody>
            {driverRows.map(({ driver, activeBooking, status }) => (
              <tr key={driver.id || driver._id} className='border-t border-gray-100'>
                <td className='px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap'>{driver.username}</td>
                <td className='px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap'>{driver.phone || '—'}</td>
                <td className='px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap'>
                  {status === 'available' ? (
                    <span className='inline-flex items-center gap-2 px-2 py-1 rounded-full bg-green-50 text-green-700 ring-1 ring-green-200 text-[11px] sm:text-xs'>
                      Available
                    </span>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        className='inline-flex items-center gap-2 px-2 py-1 rounded-full bg-red-50 text-red-700 ring-1 ring-red-200 text-[11px] sm:text-xs hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer'
                        onClick={() => {
                          if (activeBooking) setSelectedBooking(activeBooking)
                        }}
                        title='View booking details'
                      >
                        Booked
                      </button>
                      {activeBooking && carsById[String(activeBooking.carId)] && (
                        <span className='hidden sm:inline text-[11px] text-gray-500'>• {carsById[String(activeBooking.carId)].name}</span>
                      )}
                    </div>
                  )}
                </td>
                <td className='px-3 sm:px-4 py-2 sm:py-3 text-right'>
                  {status === 'booked' ? (
                    <button className='btn btn-secondary' onClick={() => { if (activeBooking) setSelectedBooking(activeBooking); else toast.info('No current booking found for this driver') }}>Details</button>
                  ) : (
                    <span className='text-xs text-gray-400'>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (() => {
        const booking = (selectedBooking?.id || selectedBooking?._id) ? (bookings||[]).find(b => String(b.id||b._id) === String(selectedBooking.id || selectedBooking._id)) : selectedBooking
        const car = booking ? carsById[String(booking.carId)] : null
        return (
          <BookingDetailsModal booking={booking} car={car} onClose={() => setSelectedBooking(null)} />
        )
      })()}
    </div>
  )
}
