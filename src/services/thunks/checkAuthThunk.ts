import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiError, TokenResponse } from "../../types/types";
import { getAccessToken } from "./getAccessTokenThunk";
import { setLoginState, setLogoutState } from "../slices/authSlice";

export const checkAuth = createAsyncThunk<
  TokenResponse,
  void,
  { rejectValue: ApiError }
>("auth/checkAuth", async (_, { dispatch, rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    dispatch(setLogoutState());
    return rejectWithValue({
      message: "No refresh token",
    });
  }

  try {
    const response = await dispatch(
      getAccessToken({ token: refreshToken }),
    ).unwrap();
    dispatch(setLoginState(response));
    return response;
  } catch (err) {
    const error = err as Error;
    dispatch(setLogoutState());
    return rejectWithValue({
      message: error.message,
    });
  }
});
