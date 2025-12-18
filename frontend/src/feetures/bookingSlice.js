import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addBookingApi, cancelBookingApi, getAllBookingsApi, getMyBookingsApi, updateBookingByIdApi, deleteBookingByIdApi } from '../data/api'
import { fetchCarsThunk } from './carsSlices'

function normalizeBooking(raw) {
  if (!raw) return raw
  const id = raw.id || raw._id
  return { ...raw, id }
}

// Booking model
// { id, userId, carId, name, phone, cnic, pickup, dropoff, startDate, endDate, instructions, status, fare }
const initialState = {
  bookings: [],
  loading: false,
  error: null
}

// Thunks
export const addBookingThunk = createAsyncThunk('bookings/add', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const data = await addBookingApi(payload)
    // Refresh cars so server-updated availability reflects immediately
    dispatch(fetchCarsThunk())
    return normalizeBooking(data)
  } catch (err) {
    return rejectWithValue(err?.response?.data || err?.message || 'Failed to add booking')
  }
})

export const cancelBookingThunk = createAsyncThunk('bookings/cancel', async (id, { rejectWithValue, dispatch }) => {
  try {
    const data = await cancelBookingApi(id)
    // Refresh cars to reflect release of availability
    dispatch(fetchCarsThunk())
    return normalizeBooking(data)
  } catch (err) {
    return rejectWithValue(err?.response?.data || err?.message || 'Failed to cancel booking')
  }
})

export const fetchAllBookingsThunk = createAsyncThunk('bookings/fetchAll', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState()
    const isAdmin = !!state?.users?.currentUser?.isAdmin
    const data = isAdmin ? await getAllBookingsApi() : await getMyBookingsApi()
    return Array.isArray(data) ? data.map(normalizeBooking) : []
  } catch (err) {
    return rejectWithValue(err?.response?.data || err?.message || 'Failed to fetch bookings')
  }
})

// Confirm booking with optional driver assignment
export const confirmBookingThunk = createAsyncThunk('bookings/confirm', async ({ id, driverId }, { rejectWithValue, dispatch }) => {
  try {
    const data = await updateBookingByIdApi(id, { status: 'confirmed', driverId })
    // Refresh cars to reflect booked status
    dispatch(fetchCarsThunk())
    return normalizeBooking(data)
  } catch (err) {
    return rejectWithValue(err?.response?.data || err?.message || 'Failed to confirm booking')
  }
})

// Update booking (generic edit)
export const updateBookingThunk = createAsyncThunk('bookings/update', async ({ id, updates }, { rejectWithValue, dispatch }) => {
  try {
    const data = await updateBookingByIdApi(id, updates)
    // If status changed, refresh cars for availability
    if (typeof updates?.status !== 'undefined') dispatch(fetchCarsThunk())
    return normalizeBooking(data)
  } catch (err) {
    return rejectWithValue(err?.response?.data || err?.message || 'Failed to update booking')
  }
})

// Delete booking
export const deleteBookingThunk = createAsyncThunk('bookings/delete', async (id, { rejectWithValue, dispatch }) => {
  try {
    await deleteBookingByIdApi(id)
    // Deletion may free cars, refresh list
    dispatch(fetchCarsThunk())
    return { id }
  } catch (err) {
    return rejectWithValue(err?.response?.data || err?.message || 'Failed to delete booking')
  }
})

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
      state.loading = false
      state.error = null
    },
    setBookingsLoading: (state, action) => {
      state.loading = !!action.payload
    },
    setBookingsError: (state, action) => {
      state.error = action.payload || null
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    // add booking
    builder.addCase(addBookingThunk.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(addBookingThunk.fulfilled, (state, action) => {
      state.loading = false
      state.bookings.push(action.payload)
    })
    builder.addCase(addBookingThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Error adding booking'
    })

    // cancel booking
    builder.addCase(cancelBookingThunk.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(cancelBookingThunk.fulfilled, (state, action) => {
      state.loading = false
      const updated = action.payload
      const i = state.bookings.findIndex(b => b.id === updated.id)
      if (i !== -1) state.bookings[i] = { ...state.bookings[i], ...updated }
    })
    builder.addCase(cancelBookingThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Error cancelling booking'
    })

    // fetch all
    builder.addCase(fetchAllBookingsThunk.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(fetchAllBookingsThunk.fulfilled, (state, action) => {
      state.loading = false
      state.bookings = action.payload
    })
    builder.addCase(fetchAllBookingsThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Error fetching bookings'
    })

    // confirm booking
    builder.addCase(confirmBookingThunk.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(confirmBookingThunk.fulfilled, (state, action) => {
      state.loading = false
      const updated = action.payload
      const i = state.bookings.findIndex(b => b.id === updated.id)
      if (i !== -1) state.bookings[i] = { ...state.bookings[i], ...updated }
    })
    builder.addCase(confirmBookingThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Error confirming booking'
    })

    // update booking (edit)
    builder.addCase(updateBookingThunk.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(updateBookingThunk.fulfilled, (state, action) => {
      state.loading = false
      const updated = action.payload
      const i = state.bookings.findIndex(b => b.id === updated.id)
      if (i !== -1) state.bookings[i] = { ...state.bookings[i], ...updated }
    })
    builder.addCase(updateBookingThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Error updating booking'
    })

    // delete booking
    builder.addCase(deleteBookingThunk.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(deleteBookingThunk.fulfilled, (state, action) => {
      state.loading = false
      const id = action.payload?.id
      if (id) state.bookings = state.bookings.filter(b => String(b.id) !== String(id))
    })
    builder.addCase(deleteBookingThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Error deleting booking'
    })
  }
})

export const { addBooking, updateBooking, removeBooking, updateBookingStatus, hydrateBookings, setBookingsLoading, setBookingsError } = bookingSlice.actions
export const selectAllBookings = state => state.bookings.bookings
export const selectBookingsLoading = state => state.bookings.loading
export const selectBookingsError = state => state.bookings.error
export default bookingSlice.reducer
