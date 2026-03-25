import { describe, it, expect } from "vitest";
import reducer, { initialState } from "./ordersAllWSSlice";
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

    expect(state).toEqual(initialState);
  });

  it("should handle onOrdersAllConnected", () => {
    const action = {
      type: onOrdersAllConnected.type,
      payload: new Event("open"),
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      status: WebSocketStatus.ONLINE,
    });
  });

  it("should handle onOrdersAllMessageReceived", () => {
    const action = {
      type: onOrdersAllMessageReceived.type,
      payload: mockMessage,
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      messages: [mockMessage],
      lastMessage: mockMessage,
    });
  });

  it("should handle onOrdersAllError", () => {
    const action = { type: onOrdersAllError.type, payload: mockError };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      error: mockError,
    });
  });

  it("should handle onOrdersAllDisconnected", () => {
    const action = {
      type: onOrdersAllDisconnected.type,
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
