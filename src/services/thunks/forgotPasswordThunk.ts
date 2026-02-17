import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ApiError,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "../../types/types";
import { forgotPasswordApi } from "../../api/forgotPassword";

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  { rejectValue: ApiError }
>(
  "auth/forgotPassword",
  async (data: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordApi(data);
      return response;
    } catch (err) {
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  },
);
