import type { UserInfoUpdate } from "../types/types";
import { fetchApi } from "./api";

export const updateUserInfo = async (
  data: unknown,
): Promise<UserInfoUpdate> => {
  return fetchApi("/auth/user", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
