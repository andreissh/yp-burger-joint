import type { TokenResponse } from "../types/types";
import { fetchApi } from "./api";

export const getToken = async (data: {
  token: string | null;
}): Promise<TokenResponse> => {
  return fetchApi("/auth/token", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
