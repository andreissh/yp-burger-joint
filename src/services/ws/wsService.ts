import {
  type WebSocketConfig,
  WebSocketStatus,
  type WebSocketMessage,
} from "../../types/types";
import { type AppDispatch } from "../store/store";
import { setStatus, addMessage, setError } from "../slices/wsSlice";

class WebSocketService {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig | null = null;
  private dispatch: AppDispatch | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempts = 0;

  connect(config: WebSocketConfig, dispatch: AppDispatch) {
    this.config = config;
    this.dispatch = dispatch;
    this.reconnectAttempts = 0;
    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    if (!this.config || !this.dispatch) return;

    try {
      this.dispatch(setStatus(WebSocketStatus.CONNECTING));
      this.ws = new WebSocket(this.config.url);

      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
      this.ws.onerror = this.handleError.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
    } catch (err) {
      console.error(err);
      this.handleError();
    }
  }

  private handleOpen() {
    if (!this.dispatch) return;
    this.dispatch(setStatus(WebSocketStatus.ONLINE));
    this.reconnectAttempts = 0;
  }

  private handleClose() {
    if (!this.dispatch) return;
    this.dispatch(setStatus(WebSocketStatus.OFFLINE));
    this.attemptReconnect();
  }

  private handleError() {
    if (!this.dispatch) return;
    this.dispatch(setError("WebSocket connection error"));
  }

  private handleMessage(event: MessageEvent) {
    if (!this.dispatch) return;

    try {
      const data = JSON.parse(event.data);
      const message: WebSocketMessage = {
        ...data,
        timestamp: Date.now(),
      };
      this.dispatch(addMessage(message));
    } catch (error) {
      console.error("Failed to parse WebSocket message:", error);
    }
  }

  private attemptReconnect() {
    if (!this.config || !this.dispatch) return;

    const maxAttempts = this.config.reconnectAttempts || 5;
    const interval = this.config.reconnectInterval || 3000;

    if (this.reconnectAttempts >= maxAttempts) {
      this.dispatch(setError("Max reconnection attempts reached"));
      return;
    }

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++;
      this.initializeWebSocket();
    }, interval);
  }

  sendMessage<T>(event: string, data: T) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage<T> = {
        event,
        data,
        timestamp: Date.now(),
      };
      this.ws.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    if (this.dispatch) {
      this.dispatch(setStatus(WebSocketStatus.OFFLINE));
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export default new WebSocketService();
