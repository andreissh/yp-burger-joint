import { type Middleware } from "@reduxjs/toolkit";
import { wsConnect, wsDisconnect, wsSend } from "../actions/wsActions";
import { addMessage, setError, setStatus } from "../slices/wsSlice";
import { WebSocketStatus } from "../../types/ws";

let socket: WebSocket | null = null;
let reconnectAttempts = 0;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let manuallyClosed = false;
let currentUrl: string | null = null;

export const wsMiddleware: Middleware = (store) => (next) => (action) => {
  const { dispatch } = store;

  if (wsConnect.match(action)) {
    const {
      url,
      reconnectAttempts: maxAttempts = 5,
      reconnectInterval = 3000,
      withTokenRefresh,
    } = action.payload;

    let wsUrl = url;
    if (withTokenRefresh) {
      const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
      if (token) wsUrl = `${url}?token=${token}`;
    }

    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      currentUrl === wsUrl
    ) {
      return next(action);
    }

    if (socket) {
      manuallyClosed = true;
      socket.close();
      socket = null;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    }

    manuallyClosed = false;
    currentUrl = wsUrl;

    socket = new WebSocket(wsUrl);
    dispatch(setStatus(WebSocketStatus.CONNECTING));

    socket.onopen = () => {
      reconnectAttempts = 0;
      dispatch(setStatus(WebSocketStatus.ONLINE));
    };

    socket.onclose = () => {
      dispatch(setStatus(WebSocketStatus.OFFLINE));

      if (!manuallyClosed && reconnectAttempts < maxAttempts) {
        reconnectAttempts++;
        reconnectTimer = setTimeout(() => {
          dispatch(wsConnect(action.payload));
        }, reconnectInterval);
      }
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
    manuallyClosed = true;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    socket?.close();
    socket = null;
    currentUrl = null;
  }

  if (wsSend.match(action)) {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ ...action.payload, timestamp: Date.now() }));
    }
  }

  return next(action);
};
