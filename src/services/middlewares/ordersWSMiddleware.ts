import type { OrderMessage } from "../../types/ws";
import {
  connectOrders,
  disconnectOrders,
  onOrdersConnected,
  onOrdersDisconnected,
  onOrdersError,
  onOrdersMessageReceived,
  sendOrdersMessage,
} from "../actions/ordersActions";
import { createWebSocketMiddleware } from "./createWSMiddleware";

export const ordersWSMiddleware = createWebSocketMiddleware<OrderMessage>(
  {
    connect: connectOrders,
    disconnect: disconnectOrders,
    sendMessage: sendOrdersMessage,
    onConnected: onOrdersConnected,
    onDisconnected: onOrdersDisconnected,
    onMessageReceived: onOrdersMessageReceived,
    onError: onOrdersError,
  },
  {
    withTokenRefresh: true,
  },
);
