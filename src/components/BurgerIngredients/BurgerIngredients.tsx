import React from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  return (
    <div className={styles.ingredientsContainer}>
      <h2 className={styles.title}>Соберите бургер</h2>
      <nav className={styles.tabs}>
        <ul className={styles.tabsList}>
          <Tab active={true} value="1" onClick={() => console.log("click")}>
            Булки
          </Tab>
          <Tab active={false} value="2" onClick={() => console.log("click")}>
            Соусы
          </Tab>
          <Tab active={false} value="3" onClick={() => console.log("click")}>
            Начинки
          </Tab>
        </ul>
      </nav>
      <div className={styles.tabContainer}>
        <div className={styles.productTypeBlock}>
          <h5 className={styles.productTypeTitle}>Булки</h5>
          <ul className={styles.productTypeList}>
            <li className={styles.productTypeItem}>Тип 1</li>
            <li className={styles.productTypeItem}>Тип 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
