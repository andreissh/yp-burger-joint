import { createSlice } from "@reduxjs/toolkit";
import type { Ingredient } from "../../types/types";
import { fetchIngredients } from "../middlewares/ingredientsMiddleware";

type IngredientsState = {
  data: Ingredient[];
  bun: Ingredient | null;
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  data: [],
  bun: null,
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.bun = action.payload.find((item) => item.type === "bun") ?? null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default ingredientsSlice.reducer;
