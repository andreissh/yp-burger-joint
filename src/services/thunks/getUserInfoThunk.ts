import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiError, UserInfo } from "../../types/types";
import { getUserInfoApi } from "../../api/getUserInfo";

export const getUserInfo = createAsyncThunk<
  UserInfo,
  void,
  { rejectValue: ApiError }
>("auth/userInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await getUserInfoApi();
    return response.user;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue({ message: error.message });
  }
});
