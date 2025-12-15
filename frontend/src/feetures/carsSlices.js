import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCars as apiGetAllCars, addCarApi, updateCarById as apiUpdateCarById, deleteCarById as apiDeleteCarById, API_ORIGIN } from '../data/api.js'

function normalizeCar(raw) {
  if (!raw) return raw
  const id = raw.id || raw._id
  const rent = typeof raw.rentPerDay === 'number' ? raw.rentPerDay : (typeof raw.pricePerDay === 'number' ? raw.pricePerDay : 0)
  // Normalize image URL across various possible fields and sanitize Windows paths
  const pick = raw.imageURL || raw.imageUrl || raw.img || raw.image || ''
  let imageURL = typeof pick === 'string' ? pick : ''
  if (imageURL) {
    imageURL = imageURL.replace(/\\/g, '/')
    if (/^file:/i.test(imageURL)) {
      imageURL = imageURL.replace(/^file:\/\//i, '/')
    }
    // Trim Windows drive prefix and map /public/... to site-root
    const lower = imageURL.toLowerCase()
    const pubIdx = lower.indexOf('/public/')
    if (pubIdx !== -1) {
      imageURL = imageURL.slice(pubIdx + '/public'.length)
    } else if (/^[a-z]:\//i.test(imageURL)) {
      imageURL = imageURL.replace(/^[a-z]:\//i, '/')
    }
    // If image is in /uploads, prefix with API_ORIGIN so it loads from backend
    if (API_ORIGIN && (/^\/uploads\//i.test(imageURL) || /^uploads\//i.test(imageURL))) {
      if (!imageURL.startsWith('/')) imageURL = '/' + imageURL
      imageURL = API_ORIGIN.replace(/\/$/, '') + imageURL
    }
  }
  return { ...raw, id, rentPerDay: rent, pricePerDay: rent, imageURL }
}

const initialState = {
  cars: [],
  loading: false,
  error: null
}

// Thunks
export const fetchCarsThunk = createAsyncThunk('cars/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await apiGetAllCars()
    return Array.isArray(res?.cars) ? res.cars.map(normalizeCar) : []
  } catch (e) {
    return rejectWithValue(e?.message || 'Failed to fetch cars')
  }
})

export const addCarThunk = createAsyncThunk('cars/add', async (formData, { rejectWithValue }) => {
  try {
    const res = await addCarApi(formData)
    return normalizeCar(res?.car)
  } catch (e) {
    return rejectWithValue(e?.message || 'Failed to add car')
  }
})

export const updateCarByIdThunk = createAsyncThunk('cars/updateById', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const res = await apiUpdateCarById(id, updates)
    return normalizeCar(res?.car || { _id: id, ...updates })
  } catch (e) {
    return rejectWithValue(e?.message || 'Failed to update car')
  }
})

export const deleteCarByIdThunk = createAsyncThunk('cars/deleteById', async (id, { rejectWithValue }) => {
  try {
    const res = await apiDeleteCarById(id)
    return res?.car?._id || id
  } catch (e) {
    return rejectWithValue(e?.message || 'Failed to delete car')
  }
})

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
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsThunk.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchCarsThunk.fulfilled, (state, action) => { state.cars = action.payload; state.loading = false })
      .addCase(fetchCarsThunk.rejected, (state, action) => { state.error = action.payload; state.loading = false })

      .addCase(addCarThunk.pending, (state) => { state.loading = true; state.error = null })
      .addCase(addCarThunk.fulfilled, (state, action) => { if (action.payload) state.cars.push(action.payload); state.loading = false })
      .addCase(addCarThunk.rejected, (state, action) => { state.error = action.payload; state.loading = false })

      .addCase(updateCarByIdThunk.fulfilled, (state, action) => {
        const updated = action.payload
        if (!updated) return
        const idx = state.cars.findIndex(c => c.id === (updated.id || updated._id))
        if (idx !== -1) state.cars[idx] = { ...state.cars[idx], ...updated }
      })
      .addCase(deleteCarByIdThunk.fulfilled, (state, action) => {
        const id = action.payload
        state.cars = state.cars.filter(c => c.id !== id && c._id !== id)
      })
  }
})

export const { addCar, removeCar, updateCar, setCarStatus, hydrateCars, setCarsLoading, setCarsError } = carsSlice.actions
export const selectAllCars = state => state.cars.cars
export const selectCarsLoading = state => state.cars.loading
export const selectCarsError = state => state.cars.error
export default carsSlice.reducer