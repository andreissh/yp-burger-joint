import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import ingredientsSelectedReducer from "./slices/ingredientsSelectedSlice";
import ingredientCurrentReducer from "./slices/ingredientCurrentSlice";
import ingredientsOrderReducer from "./slices/ingredientsOrderSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredientsOrder: ingredientsOrderReducer,
    ingredientCurrent: ingredientCurrentReducer,
    ingredientsSelected: ingredientsSelectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
