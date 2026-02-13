import type { UserInfoResponse } from "../types/types";
import { fetchApi } from "./api";

export const getUserInfoApi = async (): Promise<UserInfoResponse> => {
  return fetchApi("/auth/user");
};
