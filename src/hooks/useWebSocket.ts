import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../services/store/hooks";
import { wsConnect, wsDisconnect, wsSend } from "../services/actions/wsActions";

export const useWebSocket = (url: string) => {
  const dispatch = useAppDispatch();

  const { status, lastMessage, messages, error } = useAppSelector(
    (state) => state.websocket,
  );

  useEffect(() => {
    dispatch(wsConnect({ url }));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch, url]);

  const sendMessage = (event: string, data: unknown) => {
    dispatch(wsSend({ event, data }));
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
