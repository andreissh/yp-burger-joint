import React from "react";
import styles from "./OrderHistory.module.scss";
import Scrollbars from "rc-scrollbars";

const OrderHistory = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.orderHistoryTitle}>История заказов</h1>
      <Scrollbars style={{ width: "100%", height: 700 }}>
        <ul className={styles.orderHistoryList}>
          <li className={styles.orderHistoryItem}></li>
          <li className={styles.orderHistoryItem}></li>
          <li className={styles.orderHistoryItem}></li>
          <li className={styles.orderHistoryItem}></li>
          <li className={styles.orderHistoryItem}></li>
        </ul>
      </Scrollbars>
    </div>
  );
};

export default OrderHistory;
