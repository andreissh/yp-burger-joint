import type { TokenRequest, TokenResponse } from "../types/types";
import { fetchApi } from "./api";

export const getAccessTokenApi = async (
  data: TokenRequest,
): Promise<TokenResponse> => {
  return fetchApi("/auth/token", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
