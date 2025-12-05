import { configureStore } from '@reduxjs/toolkit'
import carsReducer from '../src/feetures/carsSlices.js'
import userReducer from '../src/feetures/UserSlices.js'
import bookingsReducer from '../src/feetures/bookingSlice.js'

const store = configureStore({
    reducer: {
        cars: carsReducer,
        users: userReducer,
        bookings: bookingsReducer
    }
})

export default store