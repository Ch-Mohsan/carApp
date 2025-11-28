import { createSlice, nanoid } from "@reduxjs/toolkit";

// Auth model: users registered with { id, username, phone, password }
// Current session stored in currentUser
const initialState = {
  users: [
    { id: nanoid(), username: "demo", phone: "+10000000000", password: "demo123" }
  ],
  currentUser: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signupUser: (state, action) => {
      const { username, phone, password } = action.payload
      const exists = state.users.some(u => u.username === username)
      if (!exists) {
        state.users.push({ id: nanoid(), username, phone, password })
      }
      state.currentUser = { username, phone }
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload
      const found = state.users.find(u => u.username === username && u.password === password)
      state.currentUser = found ? { username: found.username, phone: found.phone } : null
    },
    logoutUser: (state) => {
      state.currentUser = null
    }
  }
})

export const { signupUser, loginUser, logoutUser } = userSlice.actions
export const selectAllUsers = (state) => state.users.users
export const selectCurrentUser = (state) => state.users.currentUser
export default userSlice.reducer