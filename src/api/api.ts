import { setLogoutState } from "../services/slices/authSlice";
import { store } from "../services/store";
import { baseUrl } from "../utils/consts";

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `${accessToken}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        store.dispatch(setLogoutState());
      }

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
