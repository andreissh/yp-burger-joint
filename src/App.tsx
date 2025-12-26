import { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import type { IngredientOrder, Ingredient } from "./types/types";
import { v4 as uuidv4 } from "uuid";
import { getIngredients } from "./api/api";

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [activeOrder, setActiveOrder] = useState<IngredientOrder[]>([]);
  const [constructorBun, setConstructorBun] = useState<Ingredient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  const handleActiveOrder = (item: Ingredient) => {
    if (item.type === "bun") {
      setConstructorBun(item);
    } else {
      setActiveOrder((prev) => [...prev, { ...item, uuid: uuidv4() }]);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await getIngredients();
        const defaultBun = response.data.find((v) => v.type === "bun");
        if (!defaultBun) return;

        setIngredients(response.data);
        setConstructorBun(defaultBun);
      } catch (err) {
        setIsError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <div className="loader">Загрузка ингредиентов...</div>;
  }

  if (isError) {
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
        <BurgerIngredients
          ingredients={ingredients}
          activeOrder={activeOrder}
          onActiveOrder={handleActiveOrder}
        />
        <BurgerConstructor
          activeOrder={activeOrder}
          setActiveOrder={setActiveOrder}
          constructorBun={constructorBun}
        />
      </main>
    </div>
  );
}

export default App;
