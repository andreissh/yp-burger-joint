import { describe, it, expect } from "vitest";
import reducer, { initialState } from "./ingredientsOrderSlice";
import { getIngredientsOrder } from "../thunks/getIngredientsOrderThunk";

describe("ingredientsOrderSlice reducer", () => {
  const mockOrder = {
    success: true,
    name: "Test Order",
    order: {
      number: 12345,
    },
  };

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("should handle getIngredientsOrder.pending", () => {
    const action = { type: getIngredientsOrder.pending.type };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle getIngredientsOrder.fulfilled", () => {
    const action = {
      type: getIngredientsOrder.fulfilled.type,
      payload: mockOrder,
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      ingredientsOrder: mockOrder,
    });
  });

  it("should handle getIngredientsOrder.rejected with payload", () => {
    const error = { message: "Order failed" };
    const action = {
      type: getIngredientsOrder.rejected.type,
      payload: error,
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      error,
    });
  });

  it("should handle getIngredientsOrder.rejected without payload", () => {
    const action = {
      type: getIngredientsOrder.rejected.type,
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      error: { message: "Unknown error" },
    });
  });
});
