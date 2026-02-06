import type { OrderResponse } from "../types/types";
import { fetchApi } from "./api";

export const getIngredientsOrderApi = async (data: {
  ingredients: string[];
}): Promise<OrderResponse> => {
  return fetchApi("/orders", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
