import { describe, it, expect } from "vitest";
import reducer from "./ordersAllWSSlice";
import {
  onOrdersAllConnected,
  onOrdersAllDisconnected,
  onOrdersAllError,
  onOrdersAllMessageReceived,
} from "../actions/ordersAllActions";
import { WebSocketStatus } from "../../types/ws";

describe("ordersAllWSSlice reducer", () => {
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

  it("should handle onOrdersAllConnected", () => {
    const action = {
      type: onOrdersAllConnected.type,
      payload: new Event("open"),
    };
    const state = reducer(undefined, action);

    expect(state.status).toBe(WebSocketStatus.ONLINE);
    expect(state.messages).toEqual([]);
    expect(state.error).toBe(null);
    expect(state.lastMessage).toBe(null);
  });

  it("should handle onOrdersAllMessageReceived", () => {
    const action = {
      type: onOrdersAllMessageReceived.type,
      payload: mockMessage,
    };
    const state = reducer(undefined, action);

    expect(state.messages).toEqual([mockMessage]);
    expect(state.lastMessage).toEqual(mockMessage);
    expect(state.status).toBe(WebSocketStatus.OFFLINE);
    expect(state.error).toBe(null);
  });

  it("should handle onOrdersAllError", () => {
    const action = { type: onOrdersAllError.type, payload: mockError };
    const state = reducer(undefined, action);

    expect(state.messages).toEqual([]);
    expect(state.lastMessage).toBe(null);
    expect(state.status).toBe(WebSocketStatus.OFFLINE);
    expect(state.error).toBe(mockError);
  });

  it("should handle onOrdersAllDisconnected", () => {
    const action = {
      type: onOrdersAllDisconnected.type,
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

    expect(state.messages).toEqual([]);
    expect(state.lastMessage).toBe(null);
    expect(state.status).toBe(WebSocketStatus.OFFLINE);
    expect(state.error).toBe(null);
  });
});
