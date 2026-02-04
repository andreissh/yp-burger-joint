import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginSuccess, logout } from "../slices/authSlice";
import { fetchApi } from "../../api/api";
import type { TokenResponse } from "../../types/types";

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { dispatch, rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      dispatch(logout());
      return rejectWithValue("No refresh token");
    }

    try {
      const response = await fetchApi<TokenResponse>("/auth/token", {
        method: "POST",
        body: JSON.stringify({ token: refreshToken }),
      });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      dispatch(loginSuccess());

      return response;
    } catch (error: any) {
      dispatch(logout());
      return rejectWithValue({
        message: error.message,
        status: error.status,
      });
    }
  },
);
