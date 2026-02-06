import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  UserInfoUpdateRequest,
  UserInfoUpdateResponse,
} from "../../types/types";
import { updateUserInfoApi } from "../../api/updateUserInfo";

export const updateUserInfo = createAsyncThunk<
  UserInfoUpdateResponse,
  UserInfoUpdateRequest
>("auth/userInfoPatch", async (data) => {
  const response = await updateUserInfoApi(data);
  return response;
});
