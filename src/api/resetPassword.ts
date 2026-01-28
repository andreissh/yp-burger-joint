import type { ResetPasswordResponse } from "../types/types";
import { fetchApi } from "./api";

export const resetPassword = async (data: {
  password: string;
  token: string;
}): Promise<ResetPasswordResponse> => {
  return fetchApi("/password-reset/reset", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
