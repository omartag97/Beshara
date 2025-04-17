import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/interface/product.interface";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.error = null;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    loginUser: (
      state,
      action: PayloadAction<{ username: string; password: string }>,
    ) => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user.username === action.payload.username) {
          state.user = user;
          state.isAuthenticated = true;
          state.isInitialized = true;
          state.error = null;
        } else {
          state.error = "Invalid username or password";
          state.isInitialized = true;
        }
      } else {
        state.error = "User not found";
        state.isInitialized = true;
      }
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
      localStorage.removeItem("user");
    },

    clearError: (state) => {
      state.error = null;
    },

    checkAuthState: (state) => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        state.user = JSON.parse(storedUser);
        state.isAuthenticated = true;
      }
      state.isInitialized = true;
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
  clearError,
  checkAuthState,
} = authSlice.actions;

export default authSlice.reducer;
