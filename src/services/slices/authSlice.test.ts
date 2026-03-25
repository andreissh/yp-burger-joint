import { describe, it, expect, beforeEach } from "vitest";
import reducer, {
  initialState,
  setLoginState,
  setLogoutState,
} from "./authSlice";
import { checkAuth } from "../thunks/checkAuthThunk";

describe("authSlice reducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("should handle setLoginState and set tokens in localStorage", () => {
    const action = setLoginState({
      accessToken: "accessTokenValue",
      refreshToken: "refreshTokenValue",
    });
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      isAuth: true,
      loading: false,
    });
    expect(localStorage.getItem("accessToken")).toBe("accessTokenValue");
    expect(localStorage.getItem("refreshToken")).toBe("refreshTokenValue");
  });

  it("should handle setLogoutState and remove tokens from localStorage", () => {
    localStorage.setItem("accessToken", "accessTokenValue");
    localStorage.setItem("refreshToken", "refreshTokenValue");
    const state = reducer(undefined, setLogoutState());

    expect(state).toEqual({
      ...initialState,
      loading: false,
    });
    expect(localStorage.getItem("accessToken")).toBe(null);
    expect(localStorage.getItem("refreshToken")).toBe(null);
  });

  it("should handle checkAuth.pending", () => {
    const action = { type: checkAuth.pending.type };
    const state = reducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("should handle checkAuth.fulfilled", () => {
    const action = { type: checkAuth.fulfilled.type };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      isAuth: true,
      loading: false,
    });
  });

  it("should handle checkAuth.rejected with payload", () => {
    const error = { message: "Auth failed" };
    const action = {
      type: checkAuth.rejected.type,
      payload: error,
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });

  it("should handle checkAuth.rejected without payload", () => {
    const action = {
      type: checkAuth.rejected.type,
    };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: { message: "Auth check failed" },
    });
  });
});
