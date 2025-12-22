import React, { useState } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import BurgerIngredientsType from "./BurgerIngredientsType/BurgerIngredientsType";

const tabs = [
  { id: 1, title: "Булки" },
  { id: 2, title: "Соусы" },
  { id: 3, title: "Начинки" },
];

const BurgerIngredients = () => {
  const dataCopy = structuredClone(data);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (value: string) => {
    setActiveTab(+value);
  };

  return (
    <div className={styles.ingredientsContainer}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <nav className={styles.tabs}>
        <ul className={styles.tabsList}>
          {tabs.map((tab) => (
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
        <BurgerIngredientsType
          title="Булки"
          titleStyle={{ marginTop: 0 }}
          products={dataCopy.filter((v) => v.type === "bun")}
        />
        <BurgerIngredientsType
          title="Соусы"
          products={dataCopy.filter((v) => v.type === "sauce")}
        />
        <BurgerIngredientsType
          title="Начинки"
          products={dataCopy.filter((v) => v.type === "main")}
        />
      </div>
    </div>
  );
};

export default BurgerIngredients;
