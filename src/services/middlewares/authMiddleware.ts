import type { Middleware } from "redux";
import { logout } from "../slices/authSlice";

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/rejected") && action.payload?.status === 401) {
    store.dispatch(logout());
  }

  return next(action);
};
