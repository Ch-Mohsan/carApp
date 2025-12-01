import { configureStore } from '@reduxjs/toolkit'
import carsReducer from './feetures/carsSlices.js'
import userReducer from './feetures/UserSlices.js'
import bookingsReducer from './feetures/bookingSlice.js'

const store = configureStore({
    reducer: {
        cars: carsReducer,
        users: userReducer,
        bookings: bookingsReducer
    }
})

export default store