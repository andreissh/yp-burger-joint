import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ApiError,
  UserInfoUpdateRequest,
  UserInfoUpdateResponse,
} from "../../types/types";
import { updateUserInfoApi } from "../../api/updateUserInfo";

export const updateUserInfo = createAsyncThunk<
  UserInfoUpdateResponse,
  UserInfoUpdateRequest,
  { rejectValue: ApiError }
>(
  "auth/userInfoPatch",
  async (data: UserInfoUpdateRequest, { rejectWithValue }) => {
    try {
      const response = await updateUserInfoApi(data);
      return response;
    } catch (err) {
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  },
);
