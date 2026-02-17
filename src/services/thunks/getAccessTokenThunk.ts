import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiError, TokenRequest, TokenResponse } from "../../types/types";
import { getAccessTokenApi } from "../../api/getAccessToken";

export const getAccessToken = createAsyncThunk<
  TokenResponse,
  TokenRequest,
  { rejectValue: ApiError }
>("auth/token", async (data: TokenRequest, { rejectWithValue }) => {
  try {
    const response = await getAccessTokenApi(data);
    return response;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue({ message: error.message });
  }
});
