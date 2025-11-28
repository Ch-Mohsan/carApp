import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  current: null,
  status: 'idle'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.current = action.payload
    },
    logout: (state) => {
      state.current = null
    }
  }
})

export const { login, logout } = userSlice.actions
export const selectCurrentUser = state => state.user.current
export default userSlice.reducer
