import { createSlice, nanoid } from '@reduxjs/toolkit'

function normalizeCar(raw) {
  if (!raw) return raw
  const id = raw.id || raw._id || nanoid()
  const rent = typeof raw.rentPerDay === 'number' ? raw.rentPerDay : (typeof raw.pricePerDay === 'number' ? raw.pricePerDay : 0)
  return { ...raw, id, rentPerDay: rent, pricePerDay: rent }
}

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
      const normalized = normalizeCar(action.payload || {})
      if (!normalized.status) normalized.status = 'available'
      state.cars.push(normalized)
    },
    removeCar: (state, action) => {
      state.cars = state.cars.filter(car => car.id !== action.payload)
    },
    updateCar: (state, action) => {
      const { id, updates } = action.payload
      const realId = id || (updates && updates._id)
      const index = state.cars.findIndex(car => car.id === realId)
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
    },
    hydrateCars: (state, action) => {
      const list = Array.isArray(action.payload) ? action.payload : []
      state.cars = list.map(normalizeCar)
    }
  }
})

export const { addCar, removeCar, updateCar, setCarStatus, hydrateCars } = carsSlice.actions
export const selectAllCars = state => state.cars.cars
export default carsSlice.reducer