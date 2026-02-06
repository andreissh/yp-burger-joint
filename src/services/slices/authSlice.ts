import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { checkAuth } from "../thunks/checkAuthThunk";
import type { UserInfo } from "../../types/types";

type AuthState = {
  isAuth: boolean;
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  isAuth: false,
  user: null,
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
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
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
      .addCase(checkAuth.rejected, (state) => {
        state.isAuth = false;
        state.loading = false;
        state.error = "Auth check failed";
      });
  },
});

export const { setIsAuth, setUserInfo, setLoginState, setLogoutState } =
  authSlice.actions;

export default authSlice.reducer;
