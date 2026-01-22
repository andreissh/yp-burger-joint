import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OrderResponse } from "../../types/types";
import { getOrder } from "../../api/api";

export const fetchIngredientsOrder = createAsyncThunk<
  OrderResponse,
  { ingredients: string[] }
>("order/fetch", async (orderIds) => {
  const response = await getOrder(orderIds);
  return response;
});
