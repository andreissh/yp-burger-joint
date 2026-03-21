import reducer, {
  setLoginState,
  setLogoutState,
} from "../../src/services/slices/authSlice";
import { checkAuth } from "../../src/services/thunks/checkAuthThunk";

describe("authSlice reducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).to.deep.equal({
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

    expect(state).to.deep.equal({
      isAuth: true,
      loading: false,
      error: null,
    });
    expect(localStorage.getItem("accessToken")).to.equal("accessTokenValue");
    expect(localStorage.getItem("refreshToken")).to.equal("refreshTokenValue");
  });

  it("should handle setLogoutState and remove tokens from localStorage", () => {
    localStorage.setItem("accessToken", "accessTokenValue");
    localStorage.setItem("refreshToken", "refreshTokenValue");
    const state = reducer(undefined, setLogoutState());

    expect(state).to.deep.equal({
      isAuth: false,
      loading: false,
      error: null,
    });
    expect(localStorage.getItem("accessToken")).to.equal(null);
    expect(localStorage.getItem("refreshToken")).to.equal(null);
  });

  it("should handle checkAuth.pending", () => {
    const action = { type: checkAuth.pending.type };
    const state = reducer(undefined, action);

    expect(state.loading).to.equal(true);
    expect(state.error).to.equal(null);
  });

  it("should handle checkAuth.fulfilled", () => {
    const action = { type: checkAuth.fulfilled.type };
    const state = reducer(undefined, action);

    expect(state.isAuth).to.equal(true);
    expect(state.loading).to.equal(false);
    expect(state.error).to.equal(null);
  });

  it("should handle checkAuth.rejected with payload", () => {
    const error = { message: "Auth failed" };
    const action = {
      type: checkAuth.rejected.type,
      payload: error,
    };
    const state = reducer(undefined, action);

    expect(state.isAuth).to.equal(false);
    expect(state.loading).to.equal(false);
    expect(state.error).to.deep.equal(error);
  });

  it("should handle checkAuth.rejected without payload", () => {
    const action = {
      type: checkAuth.rejected.type,
    };
    const state = reducer(undefined, action);

    expect(state.isAuth).to.equal(false);
    expect(state.loading).to.equal(false);
    expect(state.error).to.deep.equal({ message: "Auth check failed" });
  });
});
