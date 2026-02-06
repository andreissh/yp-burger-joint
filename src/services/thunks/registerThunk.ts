import { type AuthUserResponse } from "./../../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterUserRequest } from "../../types/types";
import { registerApi } from "../../api/register";

export const register = createAsyncThunk<AuthUserResponse, RegisterUserRequest>(
  "auth/register",
  async (data) => {
    const response = await registerApi(data);
    return response;
  },
);
