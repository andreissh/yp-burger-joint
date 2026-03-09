import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../slices/ingredientsSlice";
import ingredientsSelectedReducer from "../slices/ingredientsSelectedSlice";
import ingredientCurrentReducer from "../slices/ingredientCurrentSlice";
import ingredientsOrderReducer from "../slices/ingredientsOrderSlice";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import wsReducer from "../slices/wsSlice";
import orderCurrentReducer from "../slices/orderCurrentSlice";
import { errorLogger } from "../middlewares/errorLogger";
import { wsMiddleware } from "../middlewares/wsMiddleware";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredientsOrder: ingredientsOrderReducer,
    ingredientCurrent: ingredientCurrentReducer,
    ingredientsSelected: ingredientsSelectedReducer,
    auth: authReducer,
    profile: profileReducer,
    websocket: wsReducer,
    orderCurrent: orderCurrentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsMiddleware).concat(errorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
