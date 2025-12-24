import React, { useState } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import BurgerIngredientsList from "./BurgerIngredientsList/BurgerIngredientsList";
import Scrollbars from "rc-scrollbars";
import { burgerIngredientsTabs } from "../../utils/utils";

const BurgerIngredients = () => {
  const dataCopy = structuredClone(data);
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
            products={dataCopy.filter((v) => v.type === "bun")}
          />
          <BurgerIngredientsList
            title="Соусы"
            products={dataCopy.filter((v) => v.type === "sauce")}
          />
          <BurgerIngredientsList
            title="Начинки"
            products={dataCopy.filter((v) => v.type === "main")}
          />
        </Scrollbars>
      </div>
    </section>
  );
};

export default BurgerIngredients;
