import { describe, it, expect, beforeEach } from "vitest";
import reducer, { setLoginState, setLogoutState } from "./authSlice";
import { checkAuth } from "../thunks/checkAuthThunk";

describe("authSlice reducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      isAuth: false,
      loading: true,
      error: null,
    });
  });

  it("should handle setLoginState and set tokens in localStorage", () => {
    const action = setLoginState({
      accessToken: "accessTokenValue",
      refreshToken: "refreshTokenValue",
    });
    const state = reducer(undefined, action);

    expect(state).toEqual({
      isAuth: true,
      loading: false,
      error: null,
    });
    expect(localStorage.getItem("accessToken")).toBe("accessTokenValue");
    expect(localStorage.getItem("refreshToken")).toBe("refreshTokenValue");
  });

  it("should handle setLogoutState and remove tokens from localStorage", () => {
    localStorage.setItem("accessToken", "accessTokenValue");
    localStorage.setItem("refreshToken", "refreshTokenValue");
    const state = reducer(undefined, setLogoutState());

    expect(state).toEqual({
      isAuth: false,
      loading: false,
      error: null,
    });
    expect(localStorage.getItem("accessToken")).toBe(null);
    expect(localStorage.getItem("refreshToken")).toBe(null);
  });

  it("should handle checkAuth.pending", () => {
    const action = { type: checkAuth.pending.type };
    const state = reducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle checkAuth.fulfilled", () => {
    const action = { type: checkAuth.fulfilled.type };
    const state = reducer(undefined, action);

    expect(state.isAuth).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("should handle checkAuth.rejected with payload", () => {
    const error = { message: "Auth failed" };
    const action = {
      type: checkAuth.rejected.type,
      payload: error,
    };
    const state = reducer(undefined, action);

    expect(state.isAuth).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
  });

  it("should handle checkAuth.rejected without payload", () => {
    const action = {
      type: checkAuth.rejected.type,
    };
    const state = reducer(undefined, action);

    expect(state.isAuth).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual({ message: "Auth check failed" });
  });
});
