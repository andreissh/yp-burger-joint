import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../thunks/checkAuthThunk";
import type { ApiError } from "../../types/types";

type AuthState = {
  isAuth: boolean;
  loading: boolean;
  error: ApiError | null;
};

export const initialState: AuthState = {
  isAuth: false,
  loading: true,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState(state, action) {
      state.isAuth = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    setLogoutState(state) {
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
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuth = false;
        state.loading = false;
        state.error = action.payload ?? { message: "Auth check failed" };
      });
  },
});

export const { setLoginState, setLogoutState } = authSlice.actions;

export default authSlice.reducer;
