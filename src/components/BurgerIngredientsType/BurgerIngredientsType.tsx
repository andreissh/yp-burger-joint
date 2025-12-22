import React from "react";
import styles from "./BurgerIngredientsType.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredientsType = ({ title, products }) => {
  return (
    <div className={styles.productTypeBlock}>
      <h5 className={styles.productTypeTitle}>{title}</h5>
      <ul className={styles.productTypeList}>
        {products.map((v) => {
          return (
            <li className={styles.productTypeItem}>
              <img className={styles.itemImg} src={v.image} alt={v.name} />
              <span className={styles.itemPrice}>
                {v.price}
                <CurrencyIcon type="primary" />
              </span>
              <span className={styles.itemName}>{v.name}</span>
              {/* <span className={styles.itemCounter}>1</span> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BurgerIngredientsType;
