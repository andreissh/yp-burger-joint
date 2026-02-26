import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiError, LogoutResponse } from "../../types/types";
import { logoutApi } from "../../api/logout";

export const logout = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: ApiError }
>("auth/logout", async (_, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return rejectWithValue({ message: "No refresh token found" });
  }

  try {
    const response = await logoutApi({ token: refreshToken });
    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue({ message: error.message });
  }
});
