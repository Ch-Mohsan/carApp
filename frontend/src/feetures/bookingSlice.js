import { createSlice, nanoid } from '@reduxjs/toolkit'

// Booking model
// { id, userId, carId, name, phone, cnic, pickup, dropoff, date, instructions, status }
const initialState = {
  bookings: []
}

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      const booking = { id: nanoid(), status: 'pending', fare: action.payload.fare, ...action.payload }
      state.bookings.push(booking)
    },
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload
      const i = state.bookings.findIndex(b => b.id === id)
      if (i !== -1) state.bookings[i].status = status
    },
    updateBooking: (state, action) => {
      const { id, updates } = action.payload
      const i = state.bookings.findIndex(b => b.id === id)
      if (i !== -1) state.bookings[i] = { ...state.bookings[i], ...updates }
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(b => b.id !== action.payload)
    }
  }
})

export const { addBooking, updateBooking, removeBooking, updateBookingStatus } = bookingSlice.actions
export const selectAllBookings = state => state.bookings.bookings
export default bookingSlice.reducer
