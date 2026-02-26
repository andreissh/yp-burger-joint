import React from "react";
import styles from "./OrderHistory.module.scss";
import Scrollbars from "rc-scrollbars";
import { Link } from "react-router";
import clsx from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderHistory = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.orderHistoryTitle}>История заказов</h1>
      <Scrollbars style={{ width: "100%", height: 700 }}>
        <ul className={styles.orderHistoryList}>
          <Link className={styles.orderHistoryLink} to="/profile/orders/1">
            <li className={styles.orderHistoryItem}>
              <div className={styles.orderHistoryNumberBlock}>
                <span
                  className={clsx([
                    styles.orderHistoryNumber,
                    "iceland-regular",
                  ])}
                >
                  #034535
                </span>
                <span className={styles.orderHistoryTime}>Сегодня, 16:20</span>
              </div>
              <div className={styles.orderHistoryNameBlock}>
                <h2 className={styles.orderHistoryName}>
                  Death Star Starship Main бургер
                </h2>
                <span className={styles.orderHistoryStatus}>Создан</span>
              </div>
              <div className={styles.orderHistoryIngredientsBlock}>
                <div className={styles.orderHistoryIngredients}>
                  {Array(7)
                    .fill("")
                    .map((_) => {
                      return (
                        <img
                          className={styles.orderHistoryIngredientsImg}
                          src=""
                          alt=""
                        />
                      );
                    })}
                </div>
                <div className={styles.orderHistoryPriceBlock}>
                  <span
                    className={clsx([
                      styles.orderHistoryPrice,
                      "iceland-regular",
                    ])}
                  >
                    480
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/profile/orders/1">
            <li className={styles.orderHistoryItem}></li>
          </Link>
          <Link to="/profile/orders/1">
            <li className={styles.orderHistoryItem}></li>
          </Link>
          <Link to="/profile/orders/1">
            <li className={styles.orderHistoryItem}></li>
          </Link>
          <Link to="/profile/orders/1">
            <li className={styles.orderHistoryItem}></li>
          </Link>
        </ul>
      </Scrollbars>
    </div>
  );
};

export default OrderHistory;
