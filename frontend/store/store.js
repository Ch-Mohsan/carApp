import { configureStore } from 'react-redux'  
import carsReducer from './slices/carsSlice.js'
import userReducer from './slices/userSlice.js'
    
const store = configureStore({
    reducer: {
        cars: carsReducer,
        users: userReducer
    },
})
export default store