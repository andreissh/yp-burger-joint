import { createSlice } from "@reduxjs/toolkit";
import {
  onOrdersConnected,
  onOrdersDisconnected,
  onOrdersError,
  onOrdersMessageReceived,
} from "../actions/ordersActions";
import { WebSocketStatus, type WebSocketMessage } from "../../types/ws";

type WebSocketState = {
  status: WebSocketStatus;
  messages: WebSocketMessage[];
  error: Event | null;
  lastMessage: WebSocketMessage | null;
};

const initialState: WebSocketState = {
  status: WebSocketStatus.OFFLINE,
  messages: [],
  error: null,
  lastMessage: null,
};

export const ordersWSSlice = createSlice({
  name: "ordersWS",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onOrdersConnected, (state) => {
        state.status = WebSocketStatus.ONLINE;
      })
      .addCase(onOrdersMessageReceived, (state, action) => {
        state.messages.push(action.payload);
        state.lastMessage = action.payload;
      })
      .addCase(onOrdersError, (state, action) => {
        state.error = action.payload;
        state.status = WebSocketStatus.OFFLINE;
      })
      .addCase(onOrdersDisconnected, (state) => {
        state.status = WebSocketStatus.OFFLINE;
      });
  },
});

export default ordersWSSlice.reducer;
