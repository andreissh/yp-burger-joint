import React, { useState } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";

const BurgerIngredients = () => {
  const dataCopy = structuredClone(data);
  const [products, setProducts] = useState(dataCopy);
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
        <div className={styles.productTypeBlock}>
          <h5 className={styles.productTypeTitle}>Булки</h5>
          <ul className={styles.productTypeList}>
            {products
              .filter((v) => v.type === "bun")
              .map((v) => {
                return <li className={styles.productTypeItem}>{v.name}</li>;
              })}
          </ul>
        </div>
        <div className={styles.productTypeBlock}>
          <h5 className={styles.productTypeTitle}>Соусы</h5>
          <ul className={styles.productTypeList}>
            {products
              .filter((v) => v.type === "sauce")
              .map((v) => {
                return <li className={styles.productTypeItem}>{v.name}</li>;
              })}
          </ul>
        </div>
        <div className={styles.productTypeBlock}>
          <h5 className={styles.productTypeTitle}>Начинки</h5>
          <ul className={styles.productTypeList}>
            {products
              .filter((v) => v.type === "main")
              .map((v) => {
                return <li className={styles.productTypeItem}>{v.name}</li>;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
