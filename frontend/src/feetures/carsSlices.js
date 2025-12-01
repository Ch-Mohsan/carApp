import { createSlice } from '@reduxjs/toolkit'
import carsData from '../data/car.json'

function normalizeCar(raw) {
  if (!raw) return raw
  const id = raw.id || raw._id
  const rent = typeof raw.rentPerDay === 'number' ? raw.rentPerDay : (typeof raw.pricePerDay === 'number' ? raw.pricePerDay : 0)
  return { ...raw, id, rentPerDay: rent, pricePerDay: rent }
}

const initialState = {
  cars: (Array.isArray(carsData) ? carsData : []).map(normalizeCar),
  loading: false,
  error: null
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
      state.loading = false
      state.error = null
    },
    setCarsLoading: (state, action) => {
      state.loading = !!action.payload
    },
    setCarsError: (state, action) => {
      state.error = action.payload || null
      state.loading = false
    }
  }
})

export const { addCar, removeCar, updateCar, setCarStatus, hydrateCars, setCarsLoading, setCarsError } = carsSlice.actions
export const selectAllCars = state => state.cars.cars
export const selectCarsLoading = state => state.cars.loading
export const selectCarsError = state => state.cars.error
export default carsSlice.reducer