import { createSlice } from "@reduxjs/toolkit";
import type { ApiError, OrderResponse } from "../../types/types";
import { getIngredientsOrder } from "../thunks/getIngredientsOrderThunk";

type IngredientsOrderState = {
  data: OrderResponse | null;
  loading: boolean;
  error: ApiError | null;
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
      .addCase(getIngredientsOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getIngredientsOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? { message: "Unknown error" };
      });
  },
});

export default ingredientsOrderSlice.reducer;
