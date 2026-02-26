import { createAsyncThunk } from "@reduxjs/toolkit";
import wsService from "../../services/ws/wsService";
import { type WebSocketConfig } from "../../types/types";
import type { AppDispatch, RootState } from "../store/store";

export const initializeWebSocket = createAsyncThunk<
  void,
  WebSocketConfig,
  { state: RootState; dispatch: AppDispatch }
>("websocket/initialize", async (config, { dispatch }) => {
  try {
    wsService.connect(config, dispatch);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to initialize WebSocket connection");
  }
});

export const closeWebSocket = createAsyncThunk("websocket/close", async () => {
  wsService.disconnect();
});
