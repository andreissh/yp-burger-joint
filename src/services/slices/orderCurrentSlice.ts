import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../types/ws";

type orderCurrentState = {
  orderCurrent: Order | null;
};

export const initialState: orderCurrentState = {
  orderCurrent: null,
};

export const orderCurrentSlice = createSlice({
  name: "orderCurrent",
  initialState,
  reducers: {
    addOrderCurrent(state, action: PayloadAction<Order>) {
      state.orderCurrent = action.payload;
    },
    removeOrderCurrent(state) {
      state.orderCurrent = null;
    },
  },
});

export const { addOrderCurrent, removeOrderCurrent } =
  orderCurrentSlice.actions;

export default orderCurrentSlice.reducer;
