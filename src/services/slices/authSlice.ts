import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { checkAuth } from "../thunks/checkAuthThunk";

type AuthState = {
  isAuth: boolean;
};

const initialState: AuthState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    loginSuccess(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
      });
  },
});

export const { setIsAuth, loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
