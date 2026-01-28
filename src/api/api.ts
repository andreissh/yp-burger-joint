const baseUrl = "https://norma.education-services.ru/api";

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

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
