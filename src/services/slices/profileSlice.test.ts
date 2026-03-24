import { describe, it, expect } from "vitest";
import reducer from "./profileSlice";
import { getUserInfo } from "../thunks/getUserInfoThunk";

describe("profileSlice reducer", () => {
  const mockUser = {
    email: "test@example.com",
    name: "Test User",
  };

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      user: null,
      loading: true,
      error: null,
    });
  });

  it("should handle getUserInfo.pending", () => {
    const action = { type: getUserInfo.pending.type };
    const state = reducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toBe(null);
  });

  it("should handle getUserInfo.fulfilled", () => {
    const action = {
      type: getUserInfo.fulfilled.type,
      payload: mockUser,
    };
    const state = reducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBe(null);
  });

  it("should handle getUserInfo.rejected with payload", () => {
    const error = { message: "Failed to fetch" };
    const action = {
      type: getUserInfo.rejected.type,
      payload: error,
    };
    const state = reducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
    expect(state.user).toBe(null);
  });

  it("should handle getUserInfo.rejected without payload", () => {
    const action = {
      type: getUserInfo.rejected.type,
    };
    const state = reducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual({ message: "Unknown error" });
    expect(state.user).toBe(null);
  });
});
