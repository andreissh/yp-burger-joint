import React, { useState } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import BurgerIngredientsType from "../BurgerIngredientsType/BurgerIngredientsType";

const BurgerIngredients = () => {
  const dataCopy = structuredClone(data);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (value: string) => {
    setActiveTab(+value);
  };

  return (
    <div className={styles.ingredientsContainer}>
      <h2 className={styles.title}>Соберите бургер</h2>
      <nav className={styles.tabs}>
        <ul className={styles.tabsList}>
          <Tab active={activeTab === 1} value="1" onClick={handleTabClick}>
            Булки
          </Tab>
          <Tab active={activeTab === 2} value="2" onClick={handleTabClick}>
            Соусы
          </Tab>
          <Tab active={activeTab === 3} value="3" onClick={handleTabClick}>
            Начинки
          </Tab>
        </ul>
      </nav>
      <div className={styles.tabContainer}>
        <BurgerIngredientsType
          title="Булки"
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
