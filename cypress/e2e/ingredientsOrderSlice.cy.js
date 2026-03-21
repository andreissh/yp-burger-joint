import reducer from "../../src/services/slices/ingredientsOrderSlice";
import { getIngredientsOrder } from "../../src/services/thunks/getIngredientsOrderThunk";

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

    expect(state).to.deep.equal({
      ingredientsOrder: null,
      loading: false,
      error: null,
    });
  });

  it("should handle getIngredientsOrder.pending", () => {
    const action = { type: getIngredientsOrder.pending.type };
    const state = reducer(undefined, action);

    expect(state.loading).to.equal(true);
    expect(state.error).to.equal(null);
    expect(state.ingredientsOrder).to.equal(null);
  });

  it("should handle getIngredientsOrder.fulfilled", () => {
    const action = {
      type: getIngredientsOrder.fulfilled.type,
      payload: mockOrder,
    };

    const state = reducer(undefined, action);

    expect(state.loading).to.equal(false);
    expect(state.ingredientsOrder).to.deep.equal(mockOrder);
    expect(state.error).to.equal(null);
  });

  it("should handle getIngredientsOrder.rejected with payload", () => {
    const error = { message: "Order failed" };

    const action = {
      type: getIngredientsOrder.rejected.type,
      payload: error,
    };

    const state = reducer(undefined, action);

    expect(state.loading).to.equal(false);
    expect(state.error).to.deep.equal(error);
    expect(state.ingredientsOrder).to.equal(null);
  });

  it("should handle getIngredientsOrder.rejected without payload", () => {
    const action = {
      type: getIngredientsOrder.rejected.type,
    };

    const state = reducer(undefined, action);

    expect(state.loading).to.equal(false);
    expect(state.error).to.deep.equal({ message: "Unknown error" });
    expect(state.ingredientsOrder).to.equal(null);
  });
});
