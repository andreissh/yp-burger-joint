import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OrderResponse } from "../../types/types";
import { getOrder } from "../../api/api";

export const fetchIngredientsOrder = createAsyncThunk<
  OrderResponse,
  { ingredients: string[] },
  { rejectValue: string }
>("order/fetch", async (orderIds, { rejectWithValue }) => {
  try {
    const response = await getOrder(orderIds);
    return response;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});
