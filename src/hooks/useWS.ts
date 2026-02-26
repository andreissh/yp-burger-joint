import { useEffect } from "react";
import type { WebSocketConfig } from "../types/types";
import { useAppDispatch, useAppSelector } from "../services/store/hooks";
import {
  closeWebSocket,
  initializeWebSocket,
} from "../services/thunks/wsThunk";
import wsService from "../services/ws/wsService";

const useWebSocket = (config: WebSocketConfig) => {
  const dispatch = useAppDispatch();
  const { status, messages, lastMessage, error } = useAppSelector(
    (state) => state.websocket,
  );

  useEffect(() => {
    dispatch(initializeWebSocket(config));

    return () => {
      dispatch(closeWebSocket());
    };
  }, [config, dispatch]);

  const sendMessage = <T>(event: string, data: T) => {
    wsService.sendMessage(event, data);
  };

  return {
    status,
    messages,
    lastMessage,
    error,
    sendMessage,
    isConnected: status === "ONLINE",
  };
};

export const useWS = <T>(eventType: string) => {
  const { lastMessage, ...rest } = useWebSocket({
    url: "",
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  const typedMessage =
    lastMessage?.event === eventType ? (lastMessage as { data: T }) : null;

  return {
    ...rest,
    typedMessage,
  };
};
