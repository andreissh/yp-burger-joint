import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Ingredient } from "../../types/types";
import { getIngredientsApi } from "../../api/getIngredients";

export const getIngredients = createAsyncThunk<Ingredient[], void>(
  "ingredients/getIngredients",
  async () => {
    const response = await getIngredientsApi();
    return response.data;
  },
);
