import { createAction } from "@reduxjs/toolkit";
import type { OrderMessage } from "../../types/ws";

export const connectOrders = createAction<string>("ws/orders/connect");
export const disconnectOrders = createAction("ws/orders/disconnect");
export const sendOrdersMessage = createAction<OrderMessage>("ws/orders/send");

export const onOrdersConnected = createAction<Event>("ws/orders/connected");
export const onOrdersDisconnected = createAction<CloseEvent>(
  "ws/orders/disconnected",
);
export const onOrdersMessageReceived =
  createAction<OrderMessage>("ws/orders/message");
export const onOrdersError = createAction<Event>("ws/orders/error");
