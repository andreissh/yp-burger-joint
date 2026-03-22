import reducer from "../../src/services/slices/ordersAllWSSlice";
import {
  onOrdersAllConnected,
  onOrdersAllDisconnected,
  onOrdersAllError,
  onOrdersAllMessageReceived,
} from "../../src/services/actions/ordersAllActions";
import { WebSocketStatus } from "../../src/types/ws";

describe("ordersAllWSSlice reducer", () => {
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

  it("should handle onOrdersAllConnected", () => {
    const action = {
      type: onOrdersAllConnected.type,
      payload: new Event("open"),
    };
    const state = reducer(undefined, action);

    expect(state.status).to.equal(WebSocketStatus.ONLINE);
    expect(state.messages).to.deep.equal([]);
    expect(state.error).to.equal(null);
    expect(state.lastMessage).to.equal(null);
  });

  it("should handle onOrdersAllMessageReceived", () => {
    const action = {
      type: onOrdersAllMessageReceived.type,
      payload: mockMessage,
    };
    const state = reducer(undefined, action);

    expect(state.messages).to.deep.equal([mockMessage]);
    expect(state.lastMessage).to.deep.equal(mockMessage);
    expect(state.status).to.equal(WebSocketStatus.OFFLINE);
    expect(state.error).to.equal(null);
  });

  it("should handle onOrdersAllError", () => {
    const action = { type: onOrdersAllError.type, payload: mockError };
    const state = reducer(undefined, action);

    expect(state.messages).to.deep.equal([]);
    expect(state.lastMessage).to.equal(null);
    expect(state.status).to.equal(WebSocketStatus.OFFLINE);
    expect(state.error).to.equal(mockError);
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

    expect(state.messages).to.deep.equal([]);
    expect(state.lastMessage).to.equal(null);
    expect(state.status).to.equal(WebSocketStatus.OFFLINE);
    expect(state.error).to.equal(null);
  });
});
