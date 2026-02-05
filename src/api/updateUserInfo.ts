import type {
  UserInfoUpdateRequest,
  UserInfoUpdateResponse,
} from "../types/types";
import { fetchApi } from "./api";

export const updateUserInfoApi = async (
  data: UserInfoUpdateRequest,
): Promise<UserInfoUpdateResponse> => {
  return fetchApi("/auth/user", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
