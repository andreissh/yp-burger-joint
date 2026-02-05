import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginSuccess, logout } from "../slices/authSlice";
import { fetchApi } from "../../api/api";
import type { ApiError, TokenResponse } from "../../types/types";

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

      dispatch(loginSuccess(response));

      return response;
    } catch (err: unknown) {
      const error = err as ApiError;
      dispatch(logout());
      return rejectWithValue({
        message: error.message,
        status: error.status,
      });
    }
  },
);
