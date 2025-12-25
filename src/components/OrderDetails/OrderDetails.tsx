import React from "react";
import styles from "./OrderDetails.module.scss";
import orderAccepted from "../../assets/images/order-accepted.svg";

const OrderDetails = () => {
  return (
    <div className={styles.orderContainer}>
      <span className={`${styles.orderId} iceland-regular`}>034536</span>
      <span className={styles.orderIdText}>идентификатор заказа</span>
      <img
        className={styles.orderAccepted}
        src={orderAccepted}
        alt="order accepted"
      />
      <span className={styles.orderInProcessTitle}>
        Ваш заказ начали готовить
      </span>
      <span className={styles.orderInProcessText}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

export default OrderDetails;
