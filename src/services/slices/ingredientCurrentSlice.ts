import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Ingredient } from "../../types/types";

type IngredientCurrentState = {
  data: Ingredient | null;
};

const initialState: IngredientCurrentState = {
  data: null,
};

export const ingredientCurrentSlice = createSlice({
  name: "ingredientCurrent",
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
  ingredientCurrentSlice.actions;

export default ingredientCurrentSlice.reducer;
