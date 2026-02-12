import { createSlice } from "@reduxjs/toolkit";
import type { UserInfo } from "../../types/types";
import { getUserInfo } from "../thunks/getUserInfoThunk";

type ProfileState = {
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  user: null,
  loading: true,
  error: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.error = "Profile info request failed";
      });
  },
});

export default profileSlice.reducer;
