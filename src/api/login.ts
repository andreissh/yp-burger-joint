import type { LoginRequest, LoginResponse } from "../types/types";
import { fetchApi } from "./api";

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  return fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
