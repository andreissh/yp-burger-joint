import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TokenRequest, TokenResponse } from "../../types/types";
import { getAccessTokenApi } from "../../api/getAccessToken";

export const getAccessToken = createAsyncThunk<TokenResponse, TokenRequest>(
  "auth/token",
  getAccessTokenApi,
);
