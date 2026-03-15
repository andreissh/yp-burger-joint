import { type Middleware } from "@reduxjs/toolkit";
import { wsConnect, wsDisconnect, wsSend } from "../actions/wsActions";
import { addMessage, setError, setStatus } from "../slices/wsSlice";
import { WebSocketStatus } from "../../types/ws";

let socket: WebSocket | null = null;
let currentUrl: string | null = null;

export const wsMiddleware: Middleware = (store) => (next) => (action) => {
  const { dispatch } = store;

  if (wsConnect.match(action)) {
    const { url, withTokenRefresh } = action.payload;

    let wsUrl = url;

    if (withTokenRefresh) {
      const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
      if (token) {
        wsUrl = `${url}?token=${token}`;
      }
    }

    if (socket) {
      socket.close();
      socket = null;
    }

    currentUrl = url;
    socket = new WebSocket(wsUrl);

    dispatch(setStatus(WebSocketStatus.CONNECTING));

    socket.onopen = () => {
      dispatch(setStatus(WebSocketStatus.ONLINE));
    };

    socket.onclose = () => {
      dispatch(setStatus(WebSocketStatus.OFFLINE));
      socket = null;
      currentUrl = null;
    };

    socket.onerror = () => {
      dispatch(setError("WebSocket error"));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        dispatch(addMessage({ ...data, timestamp: Date.now() }));
      } catch (err) {
        console.error("WS parse error", err);
      }
    };
  }

  if (wsDisconnect.match(action)) {
    const { url } = action.payload;

    if (currentUrl !== url) {
      return next(action);
    }

    socket?.close();
    socket = null;
    currentUrl = null;

    dispatch(setStatus(WebSocketStatus.OFFLINE));
  }

  if (wsSend.match(action)) {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(action.payload));
    }
  }

  return next(action);
};
