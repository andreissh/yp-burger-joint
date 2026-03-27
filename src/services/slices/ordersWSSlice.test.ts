import { describe, it, expect } from "vitest";
import reducer, { initialState } from "./ordersWSSlice";
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

    expect(state).toEqual(initialState);
  });

  it("should handle onOrdersConnected", () => {
    const action = { type: onOrdersConnected.type, payload: new Event("open") };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      status: WebSocketStatus.ONLINE,
    });
  });

  it("should handle onOrdersMessageReceived", () => {
    const action = { type: onOrdersMessageReceived.type, payload: mockMessage };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      messages: [mockMessage],
      lastMessage: mockMessage,
    });
  });

  it("should handle onOrdersError", () => {
    const action = { type: onOrdersError.type, payload: mockError };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      error: mockError,
    });
  });

  it("should handle onOrdersDisconnected", () => {
    const action = {
      type: onOrdersDisconnected.type,
      payload: new CloseEvent("close"),
    };
    const state = reducer(
      {
        ...initialState,
        status: WebSocketStatus.ONLINE,
      },
      action,
    );

    expect(state).toEqual(initialState);
  });
});
