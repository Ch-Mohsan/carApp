import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  cars: [
    { id: nanoid(), name: 'Honda Civic', brand: 'Honda', pricePerDay: 50, rating: 4.5, imageUrl: '/images/car-1.jpg', status: 'available' },
    { id: nanoid(), name: 'Toyota Corolla', brand: 'Toyota', pricePerDay: 45, rating: 4.2, imageUrl: '/images/car-2.jpg', status: 'available' },
    { id: nanoid(), name: 'Ford Mustang', brand: 'Ford', pricePerDay: 80, rating: 4.8, imageUrl: '/images/car-3.jpg', status: 'available' },
    { id: nanoid(), name: 'Chevrolet Camaro', brand: 'Chevrolet', pricePerDay: 75, rating: 4.6, imageUrl: '/images/car-4.jpg', status: 'available' },
    { id: nanoid(), name: 'BMW 3 Series', brand: 'BMW', pricePerDay: 90, rating: 4.7, imageUrl: '/images/car-5.jpg', status: 'available' }
  ]
}

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, action) => {
      state.cars.push({ id: nanoid(), status: 'available', ...action.payload })
    },
    removeCar: (state, action) => {
      state.cars = state.cars.filter(car => car.id !== action.payload)
    },
    updateCar: (state, action) => {
      const { id, updates } = action.payload
      const index = state.cars.findIndex(car => car.id === id)
      if (index !== -1) {
        state.cars[index] = { ...state.cars[index], ...updates }
      }
    },
    setCarStatus: (state, action) => {
      const { id, status } = action.payload
      const index = state.cars.findIndex(car => car.id === id)
      if (index !== -1) state.cars[index].status = status
    }
  }
})

export const { addCar, removeCar, updateCar, setCarStatus } = carsSlice.actions
export const selectAllCars = state => state.cars.cars
export default carsSlice.reducer