import { describe, it, expect } from "vitest";
import reducer, { initialState } from "./profileSlice";
import { getUserInfo } from "../thunks/getUserInfoThunk";

describe("profileSlice reducer", () => {
  const mockUser = {
    email: "test@example.com",
    name: "Test User",
  };

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("should handle getUserInfo.pending", () => {
    const action = { type: getUserInfo.pending.type };
    const state = reducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("should handle getUserInfo.fulfilled", () => {
    const action = {
      type: getUserInfo.fulfilled.type,
      payload: mockUser,
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      loading: false,
    });
  });

  it("should handle getUserInfo.rejected with payload", () => {
    const error = { message: "Failed to fetch" };
    const action = {
      type: getUserInfo.rejected.type,
      payload: error,
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });

  it("should handle getUserInfo.rejected without payload", () => {
    const action = {
      type: getUserInfo.rejected.type,
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: { message: "Unknown error" },
    });
  });
});
