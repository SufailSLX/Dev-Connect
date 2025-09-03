import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/lib/api"

interface User {
  _id: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

// --- Async actions ---
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/auth/signup", { email, password })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Signup failed")
    }
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", { email, password })
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed")
    }
  }
)

export const loadProfile = createAsyncThunk(
  "auth/loadProfile",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/users/me")
      return res.data
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to load profile")
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
