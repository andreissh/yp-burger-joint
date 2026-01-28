import type { ApiResponse, Ingredient } from "../types/types";
import { fetchApi } from "./api";

export const getIngredients = async (): Promise<ApiResponse<Ingredient[]>> => {
  return fetchApi("/ingredients");
};
