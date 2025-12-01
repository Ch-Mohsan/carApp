import { createSlice } from "@reduxjs/toolkit";
import usersData from '../data/user.json'

function normalizeUser(raw) {
  if (!raw) return raw
  const id = raw.id || raw._id
  return { ...raw, id }
}

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
  users: (Array.isArray(usersData) ? usersData : []).map(normalizeUser),
  currentUser: persistedUser,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Expects payload from server or client; will normalize _id
    signupUser: (state, action) => {
      const { username, phone, password, _id, id: incomingId } = action.payload
      const exists = state.users.some(u => u.username === username)
      if (!exists) {
        const id = incomingId || _id
        // Force default roles; ignore any incoming role flags from payload
        state.users.push({ id, username, phone, password, isAdmin: false, isDriver: false })
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
      // Keep currentUser minimal for UI, but roles can be used later if needed
      state.currentUser = found ? { id: found.id, username: found.username, phone: found.phone } : null
      if (state.currentUser) {
        try { localStorage.setItem('authUser', JSON.stringify(state.currentUser)) } catch {}
      }
    },
    logoutUser: (state) => {
      state.currentUser = null
      try { localStorage.removeItem('authUser') } catch {}
    },
    hydrateUsers: (state, action) => {
      const list = Array.isArray(action.payload) ? action.payload : []
      state.users = list.map(normalizeUser)
      state.loading = false
      state.error = null
    },
    setUsersLoading: (state, action) => {
      state.loading = !!action.payload
    },
    setUsersError: (state, action) => {
      state.error = action.payload || null
      state.loading = false
    }
  }
})

export const { signupUser, loginUser, logoutUser, hydrateUsers, setUsersLoading, setUsersError } = userSlice.actions
export const selectAllUsers = (state) => state.users.users
export const selectUsersLoading = (state) => state.users.loading
export const selectUsersError = (state) => state.users.error
export const selectCurrentUser = (state) => state.users.currentUser
// Helper selector to get current user with role flags from users array
export const selectCurrentUserWithRoles = (state) => {
  const cu = state.users.currentUser
  if (!cu) return null
  const full = state.users.users.find(u => (u.id || u._id) === cu.id)
  if (!full) return cu
  return { ...cu, isAdmin: !!full.isAdmin, isDriver: !!full.isDriver }
  
}
export default userSlice.reducer