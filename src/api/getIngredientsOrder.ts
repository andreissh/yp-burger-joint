import type { OrderRequest, OrderResponse } from "../types/types";
import { fetchApi } from "./api";

export const getIngredientsOrderApi = async (
  data: OrderRequest,
): Promise<OrderResponse> => {
  return fetchApi("/orders", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
