import type { OrderMessage } from "../../types/ws";
import {
  connectOrdersAll,
  disconnectOrdersAll,
  onOrdersAllConnected,
  onOrdersAllDisconnected,
  onOrdersAllError,
  onOrdersAllMessageReceived,
  sendOrdersAllMessage,
} from "../actions/ordersAllActions";
import { createWebSocketMiddleware } from "./createWSMiddleware";

export const ordersAllWSMiddleware = createWebSocketMiddleware<OrderMessage>(
  {
    connect: connectOrdersAll,
    disconnect: disconnectOrdersAll,
    sendMessage: sendOrdersAllMessage,
    onConnected: onOrdersAllConnected,
    onDisconnected: onOrdersAllDisconnected,
    onMessageReceived: onOrdersAllMessageReceived,
    onError: onOrdersAllError,
  },
  {
    withTokenRefresh: false,
  },
);
