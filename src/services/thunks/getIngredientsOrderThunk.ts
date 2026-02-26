import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiError, OrderRequest, OrderResponse } from "../../types/types";
import { getIngredientsOrderApi } from "../../api/getIngredientsOrder";

export const getIngredientsOrder = createAsyncThunk<
  OrderResponse,
  OrderRequest,
  { rejectValue: ApiError }
>(
  "ingredientsOrder/getOrder",
  async (data: OrderRequest, { rejectWithValue }) => {
    try {
      const response = await getIngredientsOrderApi(data);
      return response;
    } catch (err) {
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  },
);
