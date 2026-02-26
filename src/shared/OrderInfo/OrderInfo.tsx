import React from "react";
import styles from "./OrderInfo.module.scss";
import clsx from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderInfo = () => {
  return (
    <div className={styles.container}>
      <span className={clsx([styles.orderNumber, "iceland-regular"])}>
        #034533
      </span>
      <h2 className={styles.orderName}>Black Hole Singularity острый бургер</h2>
      <span className={styles.orderStatus}>Выполнено</span>
      <h2 className={styles.orderListTitle}>Состав:</h2>
      <ul className={styles.orderList}>
        <li className={styles.orderItem}>
          <img className={styles.orderItemImg} src="" alt="" />
          <span className={styles.orderItemName}>
            Флюоресцентная булка R2-D3
          </span>
          <div className={styles.orderItemPriceBlock}>
            <span className={clsx([styles.orderItemPrice, "iceland-regular"])}>
              2 x 20
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </li>
      </ul>
      <div className={styles.orderInfo}>
        <span className={styles.orderTime}>Вчера, 13:50</span>
        <div className={styles.orderPriceBlock}>
          <span className={clsx([styles.orderPrice, "iceland-regular"])}>
            510
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
