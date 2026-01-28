import type { UserInfo } from "../types/types";
import { fetchApi } from "./api";

export const getUserInfo = async (): Promise<UserInfo> => {
  return fetchApi("/auth/user");
};
