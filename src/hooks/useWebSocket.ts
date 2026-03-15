import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../services/store/hooks";
import { wsConnect, wsDisconnect, wsSend } from "../services/actions/wsActions";
import { WebSocketStatus } from "../types/ws";

let activeSocketUrl: string | null = null;

export const useWebSocket = (url: string, withTokenRefresh = false) => {
  const dispatch = useAppDispatch();
  const { status, lastMessage, messages, error } = useAppSelector(
    (state) => state.websocket,
  );

  useEffect(() => {
    if (activeSocketUrl && activeSocketUrl !== url) {
      dispatch(wsDisconnect({ url: activeSocketUrl }));
    }

    activeSocketUrl = url;
    dispatch(wsConnect({ url, withTokenRefresh }));

    return () => {
      if (activeSocketUrl === url) {
        dispatch(wsDisconnect({ url }));
        activeSocketUrl = null;
      }
    };
  }, [dispatch, url, withTokenRefresh]);

  const sendMessage = (event: string, data: unknown) => {
    dispatch(wsSend({ event, data }));
  };

  return {
    status,
    messages,
    lastMessage,
    error,
    sendMessage,
    isConnected: status === WebSocketStatus.ONLINE,
  };
};
