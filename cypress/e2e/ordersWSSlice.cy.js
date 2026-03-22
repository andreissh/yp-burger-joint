import reducer from "../../src/services/slices/ordersWSSlice";
import {
  onOrdersConnected,
  onOrdersDisconnected,
  onOrdersMessageReceived,
  onOrdersError,
} from "../../src/services/actions/ordersActions";
import { WebSocketStatus } from "../../src/types/ws";

describe("ordersWSSlice reducer", () => {
  const mockMessage = {
    id: 1,
    content: "Test message",
  };
  const mockError = new Event("error");

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).to.deep.equal({
      status: WebSocketStatus.OFFLINE,
      messages: [],
      error: null,
      lastMessage: null,
    });
  });

  it("should handle onOrdersConnected", () => {
    const action = { type: onOrdersConnected.type, payload: new Event("open") };
    const state = reducer(undefined, action);

    expect(state.status).to.equal(WebSocketStatus.ONLINE);
    expect(state.messages).to.deep.equal([]);
    expect(state.error).to.equal(null);
    expect(state.lastMessage).to.equal(null);
  });

  it("should handle onOrdersMessageReceived", () => {
    const action = { type: onOrdersMessageReceived.type, payload: mockMessage };
    const state = reducer(undefined, action);

    expect(state.messages).to.deep.equal([mockMessage]);
    expect(state.lastMessage).to.deep.equal(mockMessage);
    expect(state.status).to.equal(WebSocketStatus.OFFLINE);
    expect(state.error).to.equal(null);
  });

  it("should handle onOrdersError", () => {
    const action = { type: onOrdersError.type, payload: mockError };
    const state = reducer(undefined, action);

    expect(state.status).to.equal(WebSocketStatus.OFFLINE);
    expect(state.error).to.equal(mockError);
    expect(state.messages).to.deep.equal([]);
    expect(state.lastMessage).to.equal(null);
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

    expect(state.status).to.equal(WebSocketStatus.OFFLINE);
    expect(state.messages).to.deep.equal([]);
    expect(state.error).to.equal(null);
    expect(state.lastMessage).to.equal(null);
  });
});
