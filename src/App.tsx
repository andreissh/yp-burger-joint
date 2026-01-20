import { useEffect } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import type { IngredientOrder } from "./types/types";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "./services/hooks";
import { fetchIngredients } from "./services/middlewares/ingredientsMiddleware";
import {
  addIngredient,
  removeIngredient,
} from "./services/slices/ingredientsOrderSlice";

function App() {
  const {
    data: ingredients,
    loading,
    error,
  } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();
  const { data: activeOrder } = useAppSelector(
    (state) => state.ingredientsOrder,
  );

  const handleActiveOrder = (item: IngredientOrder) => {
    if (item.type === "bun") {
      const buns = activeOrder.filter((item) => item.type === "bun");
      buns.forEach((bun) => {
        dispatch(removeIngredient(bun));
        dispatch(addIngredient(item));
      });
    } else {
      dispatch(addIngredient(item));
    }
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!ingredients.length) return;

    const defaultBun = ingredients.find((item) => item.type === "bun");
    if (defaultBun) dispatch(addIngredient({ ...defaultBun, uuid: uuidv4() }));
  }, [ingredients, dispatch]);

  if (loading) {
    return <div className="loader">Загрузка ингредиентов...</div>;
  }

  if (error) {
    return (
      <div className="load-error">
        Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу.
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <AppHeader />
      <main className="page-content">
        <BurgerIngredients onActiveOrder={handleActiveOrder} />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
