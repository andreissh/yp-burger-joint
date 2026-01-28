import type { ForgotPasswordResponse } from "../types/types";
import { fetchApi } from "./api";

export const forgotPassword = async (data: {
  email: string;
}): Promise<ForgotPasswordResponse> => {
  return fetchApi("/password-reset", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
