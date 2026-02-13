import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPasswordApi } from "../../api/resetPassword";
import type {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../../types/types";

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordRequest
>("auth/resetPassword", resetPasswordApi);
