import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPasswordApi } from "../../api/resetPassword";
import type {
  ApiError,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../../types/types";

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordRequest,
  { rejectValue: ApiError }
>(
  "auth/resetPassword",
  async (data: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await resetPasswordApi(data);
      return response;
    } catch (err) {
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  },
);
