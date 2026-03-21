import reducer from "../../src/services/slices/profileSlice";
import { getUserInfo } from "../../src/services/thunks/getUserInfoThunk";

describe("profileSlice reducer", () => {
  const mockUser = {
    email: "test@example.com",
    name: "Test User",
  };

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).to.deep.equal({
      user: null,
      loading: true,
      error: null,
    });
  });

  it("should handle getUserInfo.pending", () => {
    const action = { type: getUserInfo.pending.type };
    const state = reducer(undefined, action);

    expect(state.loading).to.equal(true);
    expect(state.error).to.equal(null);
    expect(state.user).to.equal(null);
  });

  it("should handle getUserInfo.fulfilled", () => {
    const action = {
      type: getUserInfo.fulfilled.type,
      payload: mockUser,
    };
    const state = reducer(undefined, action);

    expect(state.loading).to.equal(false);
    expect(state.user).to.deep.equal(mockUser);
    expect(state.error).to.equal(null);
  });

  it("should handle getUserInfo.rejected with payload", () => {
    const error = { message: "Failed to fetch" };
    const action = {
      type: getUserInfo.rejected.type,
      payload: error,
    };
    const state = reducer(undefined, action);

    expect(state.loading).to.equal(false);
    expect(state.error).to.deep.equal(error);
    expect(state.user).to.equal(null);
  });

  it("should handle getUserInfo.rejected without payload", () => {
    const action = {
      type: getUserInfo.rejected.type,
    };
    const state = reducer(undefined, action);

    expect(state.loading).to.equal(false);
    expect(state.error).to.deep.equal({ message: "Unknown error" });
    expect(state.user).to.equal(null);
  });
});
