import { useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import type { DataOrderProps, DataProps } from "./components/types/types";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [activeOrder, setActiveOrder] = useState<DataOrderProps[]>([]);

  const handleActiveOrder = (item: DataProps) => {
    if (item.type === "bun") return;
    setActiveOrder((prev) => [...prev, { ...item, uuid: uuidv4() }]);
  };

  return (
    <div className="page-wrapper">
      <AppHeader />
      <main className="page-content">
        <BurgerIngredients
          activeOrder={activeOrder}
          onActiveOrder={handleActiveOrder}
        />
        <BurgerConstructor
          activeOrder={activeOrder}
          setActiveOrder={setActiveOrder}
        />
      </main>
    </div>
  );
}

export default App;
