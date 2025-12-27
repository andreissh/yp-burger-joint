import React, { useState } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsList from "./BurgerIngredientsList/BurgerIngredientsList";
import Scrollbars from "rc-scrollbars";
import { burgerIngredientsTabs } from "../../utils/utils";
import type { IngredientOrder, Ingredient } from "../../types/types";

type Props = {
  ingredients: Ingredient[];
  activeOrder: IngredientOrder[];
  onActiveOrder: (arg: Ingredient) => void;
};

const BurgerIngredients = ({
  ingredients,
  activeOrder,
  onActiveOrder,
}: Props) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (value: string) => {
    setActiveTab(+value);
  };

  return (
    <section className={styles.ingredientsContainer}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <nav className={styles.tabs}>
        <ul className={styles.tabsList}>
          {burgerIngredientsTabs.map((tab) => (
            <Tab
              active={activeTab === tab.id}
              value={`${tab.id}`}
              onClick={handleTabClick}
              key={tab.id}
            >
              {tab.title}
            </Tab>
          ))}
        </ul>
      </nav>
      <div className={styles.tabContainer}>
        <Scrollbars style={{ width: "100%", height: 520 }}>
          <BurgerIngredientsList
            title="Булки"
            titleStyle={{ marginTop: 0 }}
            products={ingredients.filter((v) => v.type === "bun")}
            activeOrder={activeOrder}
            onActiveOrder={onActiveOrder}
          />
          <BurgerIngredientsList
            title="Соусы"
            products={ingredients.filter((v) => v.type === "sauce")}
            activeOrder={activeOrder}
            onActiveOrder={onActiveOrder}
          />
          <BurgerIngredientsList
            title="Начинки"
            products={ingredients.filter((v) => v.type === "main")}
            activeOrder={activeOrder}
            onActiveOrder={onActiveOrder}
          />
        </Scrollbars>
      </div>
    </section>
  );
};

export default BurgerIngredients;
