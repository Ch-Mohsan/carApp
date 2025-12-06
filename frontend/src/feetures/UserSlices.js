import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersData from '../data/user.json'
import { signup as apiSignup, login as apiLogin } from '../data/api.js'
function normalizeUser(raw) {
  if (!raw) return raw
  const id = raw.id || raw._id
  return { ...raw, id }
}

// Auth model: users registered with { id, username, phone, password }
// Current session stored in currentUser
// Hydrate current user from localStorage if present
let persistedUser = null
let persistedToken = null
try {
  const raw = typeof window !== 'undefined' ? localStorage.getItem('authUser') : null
  if (raw) persistedUser = JSON.parse(raw)
  const tk = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  if (tk) persistedToken = tk
} catch (e) {
  persistedUser = null
}

// Thunks
export const signupThunk = createAsyncThunk('users/signup', async (payload, { rejectWithValue }) => {
  try {
    const res = await apiSignup(payload);
    return res;
  } catch (err) {
    const data = err?.response?.data;
    const message = data?.message || 'Signup failed';
    const issues = Array.isArray(data?.issues) ? data.issues : undefined;
    return rejectWithValue({ message, issues });
  }
});

export const loginThunk = createAsyncThunk('users/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await apiLogin(payload);
    return res;
  } catch (err) {
    const data = err?.response?.data;
    const message = data?.message || 'Login failed';
    const issues = Array.isArray(data?.issues) ? data.issues : undefined;
    return rejectWithValue({ message, issues });
  }
});

const initialState = {

 users: (Array.isArray(usersData) ? usersData : []).map(normalizeUser),
  currentUser: persistedUser,
  token: persistedToken || null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Only keep logout and misc reducers; auth handled via thunks
    logoutUser: (state) => {
      state.currentUser = null
      state.token = null
      try { localStorage.removeItem('authUser') } catch {}
      try { localStorage.removeItem('authToken') } catch {}
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
  ,
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Do NOT set currentUser or token on signup; require login to obtain JWT
        // Optionally, could store a message in error/success, but leave state unchanged here
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload && action.payload.message) || 'Signup failed';
      })
      .addCase(loginThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        const token = payload.token || null;
        const user = payload.userData || payload.user || null;
        if (token) {
          state.token = token;
          try { localStorage.setItem('authToken', token) } catch {}
        }
        if (user) {
          const normalized = normalizeUser(user);
          state.currentUser = { id: normalized.id, username: normalized.username, phone: normalized.phone || null, isAdmin: !!normalized.isAdmin, isDriver: !!normalized.isDriver };
          try { localStorage.setItem('authUser', JSON.stringify(state.currentUser)) } catch {}
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload && action.payload.message) || 'Login failed';
      })
  }
})

export const { logoutUser, hydrateUsers, setUsersLoading, setUsersError } = userSlice.actions
export const selectAllUsers = (state) => state.users.users
export const selectUsersLoading = (state) => state.users.loading
export const selectUsersError = (state) => state.users.error
export const selectCurrentUser = (state) => state.users.currentUser
// Helper selector to get current user with role flags from users array
export const selectCurrentUserWithRoles = (state) => {
  const cu = state.users.currentUser
  if (!cu) return null
  // Prefer roles from currentUser (set via server login). Fallback to users list.
  if (typeof cu.isAdmin !== 'undefined' || typeof cu.isDriver !== 'undefined') {
    return { ...cu, isAdmin: !!cu.isAdmin, isDriver: !!cu.isDriver }
  }
  const full = state.users.users.find(u => (u.id || u._id) === cu.id)
  if (!full) return cu
  return { ...cu, isAdmin: !!full.isAdmin, isDriver: !!full.isDriver }
  
}
export default userSlice.reducer