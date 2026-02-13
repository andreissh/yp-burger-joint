import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import ingredientsSelectedReducer from "./slices/ingredientsSelectedSlice";
import ingredientCurrentReducer from "./slices/ingredientCurrentSlice";
import ingredientsOrderReducer from "./slices/ingredientsOrderSlice";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    ingredientsOrder: ingredientsOrderReducer,
    ingredientCurrent: ingredientCurrentReducer,
    ingredientsSelected: ingredientsSelectedReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
