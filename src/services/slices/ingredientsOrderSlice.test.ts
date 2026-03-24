import { describe, it, expect } from "vitest";
import reducer from "./ingredientsOrderSlice";
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

    expect(state).toEqual({
      ingredientsOrder: null,
      loading: false,
      error: null,
    });
  });

  it("should handle getIngredientsOrder.pending", () => {
    const action = { type: getIngredientsOrder.pending.type };
    const state = reducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.ingredientsOrder).toBe(null);
  });

  it("should handle getIngredientsOrder.fulfilled", () => {
    const action = {
      type: getIngredientsOrder.fulfilled.type,
      payload: mockOrder,
    };

    const state = reducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.ingredientsOrder).toEqual(mockOrder);
    expect(state.error).toBe(null);
  });

  it("should handle getIngredientsOrder.rejected with payload", () => {
    const error = { message: "Order failed" };

    const action = {
      type: getIngredientsOrder.rejected.type,
      payload: error,
    };

    const state = reducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
    expect(state.ingredientsOrder).toBe(null);
  });

  it("should handle getIngredientsOrder.rejected without payload", () => {
    const action = {
      type: getIngredientsOrder.rejected.type,
    };

    const state = reducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual({ message: "Unknown error" });
    expect(state.ingredientsOrder).toBe(null);
  });
});
