import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "../types/types";
import { fetchApi } from "./api";

export const forgotPasswordApi = async (
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  return fetchApi("/password-reset", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
