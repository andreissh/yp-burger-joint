import type { Action, Middleware } from "redux";
import { setLogoutState } from "../slices/authSlice";

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const act = action as Action & { payload?: { status?: number } };
  if (act.type.endsWith("/rejected") && act.payload?.status === 401) {
    store.dispatch(setLogoutState());
  }

  return next(action);
};
