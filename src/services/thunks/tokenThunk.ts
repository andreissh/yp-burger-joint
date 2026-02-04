import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TokenRequest, TokenResponse } from "../../types/types";
import { getToken } from "../../api/token";

export const fetchAccessToken = createAsyncThunk<TokenResponse, TokenRequest>(
  "token/fetch",
  async (token) => {
    const response = await getToken(token);
    return response;
  },
);
