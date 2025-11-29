import { createSlice, nanoid } from "@reduxjs/toolkit";

// Auth model: users registered with { id, username, phone, password }
// Current session stored in currentUser
// Hydrate current user from localStorage if present
let persistedUser = null
try {
  const raw = typeof window !== 'undefined' ? localStorage.getItem('authUser') : null
  if (raw) persistedUser = JSON.parse(raw)
} catch (e) {
  persistedUser = null
}

const initialState = {
  users: [
    { id: nanoid(), username: "demo", phone: "+10000000000", password: "demo123" }
  ],
  currentUser: persistedUser
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signupUser: (state, action) => {
      const { username, phone, password } = action.payload
      const exists = state.users.some(u => u.username === username)
      if (!exists) {
        const id = nanoid()
        state.users.push({ id, username, phone, password })
        state.currentUser = { id, username, phone }
      } else {
        const found = state.users.find(u => u.username === username)
        state.currentUser = found ? { id: found.id, username: found.username, phone: found.phone } : null
      }
      if (state.currentUser) {
        try { localStorage.setItem('authUser', JSON.stringify(state.currentUser)) } catch {}
      }
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload
      const found = state.users.find(u => u.username === username && u.password === password)
      state.currentUser = found ? { id: found.id, username: found.username, phone: found.phone } : null
      if (state.currentUser) {
        try { localStorage.setItem('authUser', JSON.stringify(state.currentUser)) } catch {}
      }
    },
    logoutUser: (state) => {
      state.currentUser = null
      try { localStorage.removeItem('authUser') } catch {}
    }
  }
})

export const { signupUser, loginUser, logoutUser } = userSlice.actions
export const selectAllUsers = (state) => state.users.users
export const selectCurrentUser = (state) => state.users.currentUser
export default userSlice.reducer