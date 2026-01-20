import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Ingredient } from "../../types/types";
import { getIngredients } from "../../api/api";

export const fetchIngredients = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: string }
>("ingredients/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await getIngredients();
    return response.data;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});
