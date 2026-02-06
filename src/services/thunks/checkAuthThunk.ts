import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiError } from "../../types/types";
import { getAccessToken } from "./getAccessTokenThunk";
import { setLoginState, setLogoutState } from "../slices/authSlice";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch, rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      dispatch(setLogoutState());
      return rejectWithValue("No refresh token");
    }

    try {
      const response = await getAccessToken({ token: refreshToken });
      dispatch(setLoginState(response));
      return response;
    } catch (err: unknown) {
      const error = err as ApiError;
      dispatch(setLogoutState());
      return rejectWithValue({
        message: error.message,
        status: error.status,
      });
    }
  },
);
