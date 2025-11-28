import { configureStore } from '@reduxjs/toolkit'
import carsReducer from '../src/feetures/carsSlices.js'
import userReducer from '../src/feetures/UserSlices.js'

const store = configureStore({
    reducer: {
        cars: carsReducer,
        users: userReducer
    }
})

export default store