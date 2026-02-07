import type { LogoutRequest, LogoutResponse } from "../types/types";
import { fetchApi } from "./api";

export const logoutApi = async (
  data: LogoutRequest,
): Promise<LogoutResponse> => {
  return fetchApi("/auth/logout", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
