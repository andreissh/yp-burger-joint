import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Ingredient } from "../../types/types";
import { getIngredients } from "../../api/api";

export const fetchIngredients = createAsyncThunk<Ingredient[], void>(
  "ingredients/fetch",
  async () => {
    const response = await getIngredients();
    return response.data;
  },
);
