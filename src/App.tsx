import { useEffect, useRef } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import type { IngredientSelected } from "./types/types";
import { useAppDispatch, useAppSelector } from "./services/hooks";
import { fetchIngredients } from "./services/middlewares/ingredientsMiddleware";
import {
  addIngredient,
  removeIngredient,
} from "./services/slices/ingredientsSelectedSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { loading, error } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();
  const { data: ingredientsSelected } = useAppSelector(
    (state) => state.ingredientsSelected,
  );
  const ingredientsSelectedRef = useRef(ingredientsSelected);

  const handleIngredientsSelectedChange = (item: IngredientSelected) => {
    const currentOrder = ingredientsSelectedRef.current;

    if (item.type === "bun") {
      const buns = currentOrder.filter((item) => item.type === "bun");
      if (buns.length) {
        buns.forEach((bun) => {
          dispatch(removeIngredient(bun.uuid));
          dispatch(addIngredient(item));
        });
      } else {
        for (let i = 0; i < 2; i++) {
          dispatch(addIngredient(item));
        }
      }
    } else {
      dispatch(addIngredient(item));
    }
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    ingredientsSelectedRef.current = ingredientsSelected;
  }, [ingredientsSelected]);

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
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            onIngredientsSelectedChange={handleIngredientsSelectedChange}
          />
          <BurgerConstructor
            onIngredientsSelectedChange={handleIngredientsSelectedChange}
          />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
