import { describe, it, expect } from "vitest";
import reducer from "./ordersWSSlice";
import {
  onOrdersConnected,
  onOrdersDisconnected,
  onOrdersMessageReceived,
  onOrdersError,
} from "../actions/ordersActions";
import { WebSocketStatus } from "../../types/ws";

describe("ordersWSSlice reducer", () => {
  const mockMessage = {
    id: 1,
    content: "Test message",
  };
  const mockError = new Event("error");

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      status: WebSocketStatus.OFFLINE,
      messages: [],
      error: null,
      lastMessage: null,
    });
  });

  it("should handle onOrdersConnected", () => {
    const action = { type: onOrdersConnected.type, payload: new Event("open") };
    const state = reducer(undefined, action);

    expect(state.status).toBe(WebSocketStatus.ONLINE);
    expect(state.messages).toEqual([]);
    expect(state.error).toBe(null);
    expect(state.lastMessage).toBe(null);
  });

  it("should handle onOrdersMessageReceived", () => {
    const action = { type: onOrdersMessageReceived.type, payload: mockMessage };
    const state = reducer(undefined, action);

    expect(state.messages).toEqual([mockMessage]);
    expect(state.lastMessage).toEqual(mockMessage);
    expect(state.status).toBe(WebSocketStatus.OFFLINE);
    expect(state.error).toBe(null);
  });

  it("should handle onOrdersError", () => {
    const action = { type: onOrdersError.type, payload: mockError };
    const state = reducer(undefined, action);

    expect(state.status).toBe(WebSocketStatus.OFFLINE);
    expect(state.error).toBe(mockError);
    expect(state.messages).toEqual([]);
    expect(state.lastMessage).toBe(null);
  });

  it("should handle onOrdersDisconnected", () => {
    const action = {
      type: onOrdersDisconnected.type,
      payload: new CloseEvent("close"),
    };
    const state = reducer(
      {
        status: WebSocketStatus.ONLINE,
        messages: [],
        error: null,
        lastMessage: null,
      },
      action,
    );

    expect(state.status).toBe(WebSocketStatus.OFFLINE);
    expect(state.messages).toEqual([]);
    expect(state.error).toBe(null);
    expect(state.lastMessage).toBe(null);
  });
});
