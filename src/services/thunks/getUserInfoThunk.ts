import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserInfo } from "../../types/types";
import { getUserInfoApi } from "../../api/getUserInfo";

export const getUserInfo = createAsyncThunk<UserInfo, void>(
  "auth/userInfo",
  async () => {
    const response = await getUserInfoApi();
    return response.user;
  },
);
