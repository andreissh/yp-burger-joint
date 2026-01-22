import React from "react";
import styles from "./OrderDetails.module.scss";
import orderAccepted from "../../assets/images/order-accepted.svg";
import { useAppSelector } from "../../services/hooks";

const OrderDetails = () => {
  const {
    data: order,
    loading,
    error,
  } = useAppSelector((store) => store.ingredientsOrder);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return (
      <div>Произошла ошибка при оформлении заказа. Попробуйте еще раз.</div>
    );
  }

  return (
    <div className={styles.orderContainer}>
      <span className={`${styles.orderId} iceland-regular`}>
        {order?.order.number}
      </span>
      <span className={styles.orderIdText}>{order?.name}</span>
      <img
        className={styles.orderAccepted}
        src={orderAccepted}
        alt="order accepted checkmark"
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
