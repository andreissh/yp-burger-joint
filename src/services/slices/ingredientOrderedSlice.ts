import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Ingredient } from "../../types/types";

type IngredientOrderedState = {
  data: Ingredient | null;
};

const initialState: IngredientOrderedState = {
  data: null,
};

export const ingredientOrderedSlice = createSlice({
  name: "ingredientOrdered",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<Ingredient>) {
      state.data = action.payload;
    },
    removeIngredient(state) {
      state.data = null;
    },
  },
});

export const { addIngredient, removeIngredient } =
  ingredientOrderedSlice.actions;

export default ingredientOrderedSlice.reducer;
