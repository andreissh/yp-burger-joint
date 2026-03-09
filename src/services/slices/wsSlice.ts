import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type WebSocketMessage, WebSocketStatus } from "../../types/ws";

type WebSocketState = {
  status: WebSocketStatus;
  messages: WebSocketMessage[];
  error: string | null;
  lastMessage: WebSocketMessage | null;
};

const initialState: WebSocketState = {
  status: WebSocketStatus.OFFLINE,
  messages: [],
  error: null,
  lastMessage: null,
};

const wsSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<WebSocketStatus>) => {
      state.status = action.payload;
    },
    addMessage: (state, action: PayloadAction<WebSocketMessage>) => {
      state.messages.push(action.payload);
      state.lastMessage = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = WebSocketStatus.OFFLINE;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.lastMessage = null;
    },
  },
});

export const { setStatus, addMessage, setError, clearMessages } =
  wsSlice.actions;
export default wsSlice.reducer;
