import type { ApiError } from "./../../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Ingredient } from "../../types/types";
import { getIngredientsApi } from "../../api/getIngredients";

export const getIngredients = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: ApiError }
>("ingredients/getIngredients", async (_, { rejectWithValue }) => {
  try {
    const response = await getIngredientsApi();
    return response.data;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue({ message: error.message });
  }
});
