import { createSlice, nanoid } from '@reduxjs/toolkit'

function normalizeBooking(raw) {
  if (!raw) return raw
  const id = raw.id || raw._id || nanoid()
  return { ...raw, id }
}

// Booking model
// { id, userId, carId, name, phone, cnic, pickup, dropoff, startDate, endDate, instructions, status, fare }
const initialState = {
  bookings: []
}

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      const base = action.payload || {}
      const booking = normalizeBooking({ status: 'pending', ...base })
      if (booking.fare == null && base.fare != null) booking.fare = base.fare
      state.bookings.push(booking)
    },
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload
      const i = state.bookings.findIndex(b => b.id === id)
      if (i !== -1) state.bookings[i].status = status
    },
    updateBooking: (state, action) => {
      const { id, updates } = action.payload
      const realId = id || (updates && updates._id)
      const i = state.bookings.findIndex(b => b.id === realId)
      if (i !== -1) state.bookings[i] = { ...state.bookings[i], ...updates }
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(b => b.id !== action.payload)
    },
    hydrateBookings: (state, action) => {
      const list = Array.isArray(action.payload) ? action.payload : []
      state.bookings = list.map(normalizeBooking)
    }
  }
})

export const { addBooking, updateBooking, removeBooking, updateBookingStatus, hydrateBookings } = bookingSlice.actions
export const selectAllBookings = state => state.bookings.bookings
export default bookingSlice.reducer
