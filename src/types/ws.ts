export enum WebSocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export enum WebSocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ERROR = "error",
  MESSAGE = "message",
}

export type WebSocketConfig = {
  url: string;
  reconnectAttempts?: number;
  reconnectInterval?: number;
};

export type Order = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: "done";
  updatedAt: string;
  _id: string;
};

export type OrderMessage = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
  timestamp: number;
};

export type WebSocketMessage = OrderMessage;
