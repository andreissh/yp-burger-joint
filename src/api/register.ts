import type { CreateUserResponse } from "../types/types";
import { fetchApi } from "./api";

export const registerApi = async (data: {
  email: string;
  password: string;
  name: string;
}): Promise<CreateUserResponse> => {
  return fetchApi("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
