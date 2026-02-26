import type { Middleware } from "redux";

export const errorLogger: Middleware = () => (next) => (action) => {
  if (action.type.endsWith("/rejected")) {
    console.error("Action failed:", action);
  }

  return next(action);
};
