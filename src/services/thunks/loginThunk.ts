import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginResponse, LoginRequest, ApiError } from "../../types/types";
import { loginApi } from "../../api/login";

export const login = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: ApiError }
>("auth/login", async (data: LoginRequest, { rejectWithValue }) => {
  try {
    const response = await loginApi(data);
    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue({ message: error.message });
  }
});
