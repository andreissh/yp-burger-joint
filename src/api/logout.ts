import type { LogoutResponse } from "../types/types";
import { fetchApi } from "./api";

export const logout = async (data: {
  token: string;
}): Promise<LogoutResponse> => {
  return fetchApi("/auth/logout", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
