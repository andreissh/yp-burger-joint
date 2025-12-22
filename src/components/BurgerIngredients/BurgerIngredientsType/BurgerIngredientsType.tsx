import React from "react";
import styles from "./BurgerIngredientsType.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredientsType = ({ title, titleStyle = {}, products }) => {
  return (
    <div className={styles.productTypeBlock}>
      <h2 className={styles.productTypeTitle} style={titleStyle}>
        {title}
      </h2>
      <ul className={styles.productTypeList}>
        {products.map((v) => {
          return (
            <li className={styles.productTypeItem} key={v._id}>
              <img className={styles.itemImg} src={v.image} alt={v.name} />
              <span className={`${styles.itemPrice} iceland-regular`}>
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
