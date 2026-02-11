import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterResponse, RegisterRequest } from "../../types/types";
import { registerApi } from "../../api/register";

export const register = createAsyncThunk<RegisterResponse, RegisterRequest>(
  "auth/register",
  registerApi,
);
