import type {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/types";
import { fetchApi } from "./api";

export const resetPasswordApi = async (
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  return fetchApi("/password-reset/reset", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
