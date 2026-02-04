import type { UserInfo } from "../types/types";
import { fetchApi } from "./api";

export const getUserInfo = async (token: string): Promise<UserInfo> => {
  return fetchApi("/auth/user", { headers: { authorization: token } });
};
