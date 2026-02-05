import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LogoutResponse } from "../../types/types";
import { logout } from "../../api/logout";

export const logoutUser = createAsyncThunk<LogoutResponse, void>(
  "logout/fetch",
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return rejectWithValue("No refresh token found");
    }
    const response = await logout({ token: refreshToken });
    return response;
  },
);
