import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBookingStatus } from '../feetures/bookingSlice.js'
import { toast } from 'react-toastify'

export default function BookingDetailsModal({ booking, car, onClose }) {
  if (!booking) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" onClick={onClose} />
        <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-sm mx-4 rounded-2xl bg-white ring-1 ring-gray-200 shadow-2xl text-black p-5">
          <div className="text-lg font-bold mb-2">Booking not found</div>
          <div className="text-sm text-gray-600">The selected booking could not be located.</div>
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-md bg-[#1089ff] text-white font-semibold hover:bg-[#0d75db]">Close</button>
          </div>
        </div>
      </div>
    )
  }
  const dispatch = useDispatch()
  const period = `${booking.startDate || booking.date} → ${booking.endDate || booking.date}`
  const canConfirm = booking.status === 'pending'
  const canCancel = booking.status === 'pending'

  const handleConfirm = () => {
    if (!canConfirm) return
    dispatch(updateBookingStatus({ id: booking.id, status: 'confirmed' }))
    toast.success('Booking confirmed')
    onClose()
  }

  const handleCancel = () => {
    if (!canCancel) return
    dispatch(updateBookingStatus({ id: booking.id, status: 'cancelled' }))
    toast.success('Booking cancelled')
    onClose()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-lg mx-4 rounded-2xl bg-white ring-1 ring-gray-200 shadow-2xl text-black">
        <div className="flex items-center justify-between px-5 pt-5">
          <h3 className="text-xl font-bold">Booking Details</h3>
          <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 shadow" aria-label="Close">✕</button>
        </div>
        <div className="px-5 pb-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden ring-1 ring-gray-200 bg-white">
              <div className="w-full h-32">
                {car?.imageUrl && <img src={car.imageUrl} alt={car?.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-3">
                <div className="font-semibold">{car?.name || 'Unknown Car'}</div>
                <div className="text-gray-600 text-sm">{car?.brand || ''}</div>
              </div>
            </div>
            <div className="rounded-lg ring-1 ring-gray-200 bg-white p-3">
              <div className="text-sm text-gray-600">Status</div>
              <div className="text-lg font-bold">{booking.status}</div>
              <div className="mt-2 text-sm text-gray-600">Period</div>
              <div className="font-medium">{period}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Customer</div>
              <div className="font-medium">{booking.name} ({booking.phone})</div>
            </div>
            <div>
              <div className="text.sm text-gray-600">CNIC</div>
              <div className="font-medium">{booking.cnic || '—'}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Pickup</div>
              <div className="font-medium">{booking.pickup}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Dropoff</div>
              <div className="font-medium">{booking.dropoff}</div>
            </div>
          </div>
          {booking.instructions && (
            <div className="text-xs text-gray-600 italic">“{booking.instructions}”</div>
          )}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              disabled={!canCancel}
              className={`px-5 py-2 rounded-md font-semibold ${canCancel ? 'bg-gray-300 text-gray-700 hover:bg-gray-400' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >Cancel</button>
            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              className={`px-5 py-2 rounded-md font-semibold ${canConfirm ? 'bg-[#01d28e] text-black hover:brightness-95' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >Confirm</button>
            <button onClick={onClose} className="px-5 py-2 rounded-md bg-[#1089ff] text-white font-semibold hover:bg-[#0d75db]">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
