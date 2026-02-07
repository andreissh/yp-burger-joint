import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiError, AuthError, TokenResponse } from "../../types/types";
import { getAccessToken } from "./getAccessTokenThunk";
import { setLoginState, setLogoutState } from "../slices/authSlice";

export const checkAuth = createAsyncThunk<
  TokenResponse,
  void,
  { rejectValue: AuthError }
>("auth/checkAuth", async (_, { dispatch, rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    dispatch(setLogoutState());
    return rejectWithValue({
      message: "No refresh token",
      status: 401,
    });
  }

  try {
    const response = await dispatch(
      getAccessToken({ token: refreshToken }),
    ).unwrap();
    dispatch(setLoginState(response));
    return response;
  } catch (err: unknown) {
    const error = err as ApiError;
    dispatch(setLogoutState());
    return rejectWithValue({
      message: error.message,
      status: Number(error.status),
    });
  }
});
