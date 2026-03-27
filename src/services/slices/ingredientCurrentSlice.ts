import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Ingredient } from "../../types/types";

type IngredientCurrentState = {
  ingredientCurrent: Ingredient | null;
};

export const initialState: IngredientCurrentState = {
  ingredientCurrent: null,
};

export const ingredientCurrentSlice = createSlice({
  name: "ingredientCurrent",
  initialState,
  reducers: {
    addCurrentIngredient(state, action: PayloadAction<Ingredient>) {
      state.ingredientCurrent = action.payload;
    },
    removeCurrentIngredient(state) {
      state.ingredientCurrent = null;
    },
  },
});

export const { addCurrentIngredient, removeCurrentIngredient } =
  ingredientCurrentSlice.actions;

export default ingredientCurrentSlice.reducer;
