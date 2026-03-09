import React, { useEffect } from "react";
import styles from "./OrderInfo.module.scss";
import clsx from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/store/hooks";
import Scrollbars from "rc-scrollbars";

const OrderInfo = () => {
  const { orderCurrent } = useAppSelector((state) => state.orderCurrent);
  const { ingredients } = useAppSelector((state) => state.ingredients);
  let currentOrderIngredientsMap = new Map();

  useEffect(() => {
    if (!orderCurrent) return;

    orderCurrent?.ingredients.forEach((item) => {
      const ingredient = ingredients.find(
        (ingredient) => ingredient._id === item,
      );
      currentOrderIngredientsMap.set(ingredient?._id, {
        count: currentOrderIngredientsMap.get(ingredient?._id)
          ? currentOrderIngredientsMap.get(ingredient?._id).count++
          : 1,
        price: ingredient?.price,
        name: ingredient?.name,
      });
    });
  }, [currentOrderIngredientsMap, ingredients, orderCurrent]);
  console.log(currentOrderIngredientsMap);

  if (!orderCurrent) return null;

  return (
    <div className={styles.container}>
      <span className={clsx([styles.orderNumber, "iceland-regular"])}>
        {orderCurrent.number}
      </span>
      <h2 className={styles.orderName}>{orderCurrent.name}</h2>
      <span className={styles.orderStatus}>{orderCurrent.status}</span>
      <h2 className={styles.orderListTitle}>Состав:</h2>
      <Scrollbars style={{ width: "100%", height: 320 }}>
        <ul className={styles.orderList}>
          {Array.from(currentOrderIngredientsMap).map((item) => {
            return (
              <li className={styles.orderItem}>
                <img className={styles.orderItemImg} src="" alt="" />
                <span className={styles.orderItemName}>{item.name}</span>
                <div className={styles.orderItemPriceBlock}>
                  <span
                    className={clsx([styles.orderItemPrice, "iceland-regular"])}
                  >
                    {item.count} x {item.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
      </Scrollbars>
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
