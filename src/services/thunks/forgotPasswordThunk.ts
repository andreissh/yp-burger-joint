import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "../../types/types";
import { forgotPasswordApi } from "../../api/forgotPassword";

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest
>("auth/forgotPassword", async (data) => {
  const response = await forgotPasswordApi(data);
  return response;
});
