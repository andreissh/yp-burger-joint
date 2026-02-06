import type { AuthUserResponse } from "../types/types";
import { fetchApi } from "./api";

export const loginApi = async (data: {
  email: string;
  password: string;
}): Promise<AuthUserResponse> => {
  return fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
