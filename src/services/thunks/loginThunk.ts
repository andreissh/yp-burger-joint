import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginResponse, LoginRequest } from "../../types/types";
import { loginApi } from "../../api/login";

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  loginApi,
);
