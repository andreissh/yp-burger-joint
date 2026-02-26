import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  RegisterResponse,
  RegisterRequest,
  ApiError,
} from "../../types/types";
import { registerApi } from "../../api/register";

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: ApiError }
>("auth/register", async (data: RegisterRequest, { rejectWithValue }) => {
  try {
    const response = await registerApi(data);
    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue({ message: error.message });
  }
});
