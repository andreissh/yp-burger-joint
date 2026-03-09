import { createAction } from "@reduxjs/toolkit";
import { type WebSocketConfig } from "../../types/ws";

export const wsConnect = createAction<WebSocketConfig>("ws/connect");

export const wsDisconnect = createAction<{ url: string }>("ws/disconnect");

export const wsSend = createAction<{
  event: string;
  data: unknown;
}>("ws/send");
