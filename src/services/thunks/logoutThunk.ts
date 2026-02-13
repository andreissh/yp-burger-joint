import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LogoutResponse } from "../../types/types";
import { logoutApi } from "../../api/logout";

export const logout = createAsyncThunk<LogoutResponse, void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return rejectWithValue("No refresh token found");
    }
    const response = await logoutApi({ token: refreshToken });
    return response;
  },
);
