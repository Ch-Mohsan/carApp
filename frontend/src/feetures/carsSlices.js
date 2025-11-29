import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  cars: [
    { id: nanoid(), name: 'Honda Civic', brand: 'Honda', pricePerDay: 50, rentPerDay: 50, category: 'sedan', rating: 4.5, imageUrl: '/images/car-1.jpg', status: 'available' },
    { id: nanoid(), name: 'Toyota Corolla', brand: 'Toyota', pricePerDay: 45, rentPerDay: 45, category: 'sedan', rating: 4.2, imageUrl: '/images/car-2.jpg', status: 'available' },
    { id: nanoid(), name: 'Ford Mustang', brand: 'Ford', pricePerDay: 80, rentPerDay: 80, category: 'sport', rating: 4.8, imageUrl: '/images/car-3.jpg', status: 'available' },
    { id: nanoid(), name: 'Chevrolet Camaro', brand: 'Chevrolet', pricePerDay: 75, rentPerDay: 75, category: 'muscle', rating: 4.6, imageUrl: '/images/car-4.jpg', status: 'available' },
    { id: nanoid(), name: 'BMW 3 Series', brand: 'BMW', pricePerDay: 90, rentPerDay: 90, category: 'luxury', rating: 4.7, imageUrl: '/images/car-5.jpg', status: 'available' }
  ]
}

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, action) => {
      const { pricePerDay, rentPerDay, category, ...rest } = action.payload || {}
      const daily = typeof rentPerDay === 'number' ? rentPerDay : (typeof pricePerDay === 'number' ? pricePerDay : 0)
      state.cars.push({ id: nanoid(), status: 'available', pricePerDay: daily, rentPerDay: daily, category: category || 'uncategorized', ...rest })
    },
    removeCar: (state, action) => {
      state.cars = state.cars.filter(car => car.id !== action.payload)
    },
    updateCar: (state, action) => {
      const { id, updates } = action.payload
      const index = state.cars.findIndex(car => car.id === id)
      if (index !== -1) {
        const applied = { ...updates }
        if (applied.rentPerDay != null && typeof applied.rentPerDay === 'number') {
          applied.pricePerDay = applied.rentPerDay
        } else if (applied.pricePerDay != null && typeof applied.pricePerDay === 'number') {
          applied.rentPerDay = applied.pricePerDay
        }
        state.cars[index] = { ...state.cars[index], ...applied }
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