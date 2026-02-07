import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Ingredient } from "../../types/types";

type IngredientsState = {
  data: Ingredient[];
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  data: [],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients(state, action: PayloadAction<Ingredient[]>) {
      state.data = action.payload;
    },
  },
});

export const { setIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
