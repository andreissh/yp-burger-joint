import { createAction } from "@reduxjs/toolkit";
import type { OrderMessage } from "../../types/ws";

export const connectOrdersAll = createAction<string>("ws/ordersAll/connect");
export const disconnectOrdersAll = createAction("ws/ordersAll/disconnect");
export const sendOrdersAllMessage =
  createAction<OrderMessage>("ws/ordersAll/send");

export const onOrdersAllConnected = createAction<Event>(
  "ws/ordersAll/connected",
);
export const onOrdersAllDisconnected = createAction<CloseEvent>(
  "ws/ordersAll/disconnected",
);
export const onOrdersAllMessageReceived = createAction<OrderMessage>(
  "ws/ordersAll/message",
);
export const onOrdersAllError = createAction<Event>("ws/ordersAll/error");
