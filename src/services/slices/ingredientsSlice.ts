import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiError, Ingredient } from "../../types/types";
import { getIngredients } from "../thunks/getIngredientsThunk";

type IngredientsState = {
  ingredients: Ingredient[];
  loading: boolean;
  error: ApiError | null;
};

export const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients(state, action: PayloadAction<Ingredient[]>) {
      state.ingredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? { message: "Unknown error" };
      });
  },
});

export const { setIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
