import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import ingredientsOrderReducer from "./slices/ingredientsOrderSlice";
import ingredientCurrentReducer from "./slices/ingredientCurrentSlice";
import ingredientOrderedReducer from "./slices/ingredientOrderedSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredientsOrder: ingredientsOrderReducer,
    ingredientCurrent: ingredientCurrentReducer,
    ingredientOrdered: ingredientOrderedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
