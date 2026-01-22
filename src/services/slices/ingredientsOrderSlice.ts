import { createSlice } from "@reduxjs/toolkit";
import type { OrderResponse } from "../../types/types";
import { fetchIngredientsOrder } from "../middlewares/ingredientsOrderMiddleware";

type IngredientsOrderState = {
  data: OrderResponse | null;
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsOrderState = {
  data: null,
  loading: false,
  error: null,
};

export const ingredientsOrderSlice = createSlice({
  name: "ingredientsOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredientsOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default ingredientsOrderSlice.reducer;
