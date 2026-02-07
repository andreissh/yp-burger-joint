import type { ApiResponse, Ingredient } from "../types/types";
import { fetchApi } from "./api";

export const getIngredientsApi = async (): Promise<
  ApiResponse<Ingredient[]>
> => {
  return fetchApi("/ingredients");
};
