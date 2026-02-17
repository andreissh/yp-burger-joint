import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IngredientSelected } from "../../types/types";

type ingredientsSelectedState = {
  ingredientsSelected: IngredientSelected[];
};

const initialState: ingredientsSelectedState = {
  ingredientsSelected: [],
};

export const ingredientsSelectedSlice = createSlice({
  name: "ingredientsSelected",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<IngredientSelected>) {
      state.ingredientsSelected.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredientsSelected = state.ingredientsSelected.filter(
        (item) => item.uuid !== action.payload,
      );
    },
    shuffleIngredients(state, action: PayloadAction<IngredientSelected[]>) {
      state.ingredientsSelected = action.payload;
    },
    removeAllIngredients(state) {
      state.ingredientsSelected = [];
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  shuffleIngredients,
  removeAllIngredients,
} = ingredientsSelectedSlice.actions;

export default ingredientsSelectedSlice.reducer;
