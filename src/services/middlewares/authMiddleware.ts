import type { Middleware } from "redux";

export const authMiddleware: Middleware = () => (next) => (action) => {
  return next(action);
};
