import type { Middleware } from "redux";
import { setLogoutState } from "../slices/authSlice";

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/rejected") && action.payload?.status === 401) {
    store.dispatch(setLogoutState());
  }

  return next(action);
};
