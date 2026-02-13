import type { RegisterRequest, RegisterResponse } from "../types/types";
import { fetchApi } from "./api";

export const registerApi = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  return fetchApi("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
