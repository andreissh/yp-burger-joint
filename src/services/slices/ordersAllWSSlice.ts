import { createSlice } from "@reduxjs/toolkit";
import { WebSocketStatus, type WebSocketMessage } from "../../types/ws";
import {
  onOrdersAllConnected,
  onOrdersAllDisconnected,
  onOrdersAllError,
  onOrdersAllMessageReceived,
} from "../actions/ordersAllActions";

type WebSocketState = {
  status: WebSocketStatus;
  messages: WebSocketMessage[];
  lastMessage: WebSocketMessage | null;
  error: Event | null;
};

export const initialState: WebSocketState = {
  status: WebSocketStatus.OFFLINE,
  messages: [],
  lastMessage: null,
  error: null,
};

export const ordersAllWSSlice = createSlice({
  name: "ordersAllWS",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onOrdersAllConnected, (state) => {
        state.status = WebSocketStatus.ONLINE;
      })
      .addCase(onOrdersAllMessageReceived, (state, action) => {
        state.messages.push(action.payload);
        state.lastMessage = action.payload;
      })
      .addCase(onOrdersAllError, (state, action) => {
        state.status = WebSocketStatus.OFFLINE;
        state.error = action.payload;
      })
      .addCase(onOrdersAllDisconnected, (state) => {
        state.status = WebSocketStatus.OFFLINE;
      });
  },
});

export default ordersAllWSSlice.reducer;
