import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IngredientOrder } from "../../types/types";

type IngredientsOrderState = {
  data: IngredientOrder[];
};

const initialState: IngredientsOrderState = {
  data: [],
};

export const ingredientsOrderSlice = createSlice({
  name: "ingredientsOrder",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<IngredientOrder>) {
      state.data.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    shuffleIngredients(state, action: PayloadAction<IngredientOrder[]>) {
      state.data = action.payload;
    },
  },
});

export const { addIngredient, removeIngredient, shuffleIngredients } =
  ingredientsOrderSlice.actions;

export default ingredientsOrderSlice.reducer;
