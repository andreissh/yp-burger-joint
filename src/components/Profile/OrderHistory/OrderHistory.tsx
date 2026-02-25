import React from "react";
import styles from "./OrderHistory.module.scss";
import Scrollbars from "rc-scrollbars";
import { Link } from "react-router";

const OrderHistory = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.orderHistoryTitle}>История заказов</h1>
      <Scrollbars style={{ width: "100%", height: 700 }}>
        <ul className={styles.orderHistoryList}>
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
          <Link to="/profile/orders/1">
            <li className={styles.orderHistoryItem}></li>
          </Link>
        </ul>
      </Scrollbars>
    </div>
  );
};

export default OrderHistory;
