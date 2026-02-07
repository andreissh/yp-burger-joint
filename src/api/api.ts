import { setLogoutState } from "../services/slices/authSlice";
import { store } from "../services/store";

const baseUrl = "https://norma.education-services.ru/api";

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `${accessToken}` }),
      ...options.headers,
    },
    ...options,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      store.dispatch(setLogoutState());
    }

    throw new Error(json.message);
  }

  return json;
};
