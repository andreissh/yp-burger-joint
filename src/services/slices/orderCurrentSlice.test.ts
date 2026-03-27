import { describe, it, expect } from "vitest";
import reducer, {
  initialState,
  addOrderCurrent,
  removeOrderCurrent,
} from "./orderCurrentSlice";
import type { Order } from "../../types/ws";

describe("orderCurrentSlice reducer", () => {
  const mockOrder: Order = {
    _id: "123",
    ingredients: ["ingredient1", "ingredient2"],
    status: "done",
    name: "Test Order",
    number: 12345,
    createdAt: "2026-01-01T12:00:00Z",
    updatedAt: "2026-01-01T12:00:00Z",
  };

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("should handle addOrderCurrent", () => {
    const action = addOrderCurrent(mockOrder);
    const state = reducer(undefined, action);

    expect(state.orderCurrent).toEqual(mockOrder);
  });

  it("should handle removeOrderCurrent", () => {
    const initialStateWithOrder = {
      orderCurrent: mockOrder,
    };
    const state = reducer(initialStateWithOrder, removeOrderCurrent());

    expect(state).toEqual(initialState);
  });

  it("should replace existing order when adding new order", () => {
    const firstOrder = {
      ...mockOrder,
      number: 11111,
      name: "First Order",
    };
    const secondOrder = {
      ...mockOrder,
      number: 22222,
      name: "Second Order",
    };
    let state = reducer(undefined, addOrderCurrent(firstOrder));

    expect(state.orderCurrent).toEqual(firstOrder);

    state = reducer(state, addOrderCurrent(secondOrder));
    expect(state.orderCurrent).toEqual(secondOrder);
    expect(state.orderCurrent?.number).toBe(22222);
  });
});
