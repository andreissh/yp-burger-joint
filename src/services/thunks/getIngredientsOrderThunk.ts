import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OrderRequest, OrderResponse } from "../../types/types";
import { getIngredientsOrderApi } from "../../api/getIngredientsOrder";

export const getIngredientsOrder = createAsyncThunk<
  OrderResponse,
  OrderRequest
>("ingredientsOrder/getOrder", getIngredientsOrderApi);
