const baseUrl = "https://norma.education-services.ru/api";

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 401) {
    throw new Error("Session expired. Please login again.");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP error with status ${response.status}`,
    }));

    throw new Error(
      error.message || `Request failed with status ${response.status}`,
    );
  }

  return response.json();
};
