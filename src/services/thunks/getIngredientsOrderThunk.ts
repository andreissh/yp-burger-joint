import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OrderResponse } from "../../types/types";
import { getIngredientsOrderApi } from "../../api/getIngredientsOrder";

export const getIngredientsOrder = createAsyncThunk<
  OrderResponse,
  { ingredients: string[] }
>("ingredientsOrder/getOrder", async (orderIds) => {
  const response = await getIngredientsOrderApi(orderIds);
  return response;
});
