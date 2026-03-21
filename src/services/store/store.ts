import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../slices/ingredientsSlice";
import ingredientsSelectedReducer from "../slices/ingredientsSelectedSlice";
import ingredientCurrentReducer from "../slices/ingredientCurrentSlice";
import ingredientsOrderReducer from "../slices/ingredientsOrderSlice";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import orderCurrentReducer from "../slices/orderCurrentSlice";
import ordersWSReducer from "../slices/ordersWSSlice";
import ordersAllWSReducer from "../slices/ordersAllWSSlice";
import { ordersWSMiddleware } from "../middlewares/ordersWSMiddleware";
import { ordersAllWSMiddleware } from "../middlewares/ordersAllWSMiddleware";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredientsOrder: ingredientsOrderReducer,
    ingredientCurrent: ingredientCurrentReducer,
    ingredientsSelected: ingredientsSelectedReducer,
    auth: authReducer,
    profile: profileReducer,
    orderCurrent: orderCurrentReducer,
    ordersWS: ordersWSReducer,
    ordersAllWS: ordersAllWSReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      ordersWSMiddleware,
      ordersAllWSMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
