import { type AuthUserResponse } from "./../../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterUserRequest } from "../../types/types";
import { createUser } from "../../api/createUser";

export const registerUser = createAsyncThunk<
  AuthUserResponse,
  RegisterUserRequest
>("register/fetch", async (data) => {
  const response = await createUser(data);
  return response;
});
