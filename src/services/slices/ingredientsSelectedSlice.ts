import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IngredientSelected } from "../../types/types";

type ingredientsSelectedState = {
  data: IngredientSelected[];
};

const initialState: ingredientsSelectedState = {
  data: [],
};

export const ingredientsSelectedSlice = createSlice({
  name: "ingredientsSelected",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<IngredientSelected>) {
      state.data.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    shuffleIngredients(state, action: PayloadAction<IngredientSelected[]>) {
      state.data = action.payload;
    },
    removeAllIngredients(state) {
      state.data = [];
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
