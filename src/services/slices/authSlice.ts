import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { checkAuth } from "../thunks/checkAuthThunk";

type AuthState = {
  isAuth: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  isAuth: false,
  loading: true,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    loginSuccess(state, action) {
      state.isAuth = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout(state) {
      state.isAuth = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
        state.loading = false;
        state.error = "Auth check failed";
      });
  },
});

export const { setIsAuth, loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
