import React, { useEffect, useState } from "react";
import styles from "./OrderInfo.module.scss";
import clsx from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import Scrollbars from "rc-scrollbars";
import { useLocation, useParams } from "react-router";
import { addOrderCurrent } from "../../services/slices/orderCurrentSlice";
import { wsOrdersUrl } from "../../utils/consts";
import { OrderStatus } from "../../types/types";
import { formatOrderDate } from "../../utils/utils";
import {
  connectOrders,
  disconnectOrders,
} from "../../services/actions/ordersActions";
import {
  connectOrdersAll,
  disconnectOrdersAll,
} from "../../services/actions/ordersAllActions";

const getIngredientsCount = (ingredients: string[]) => {
  return ingredients.reduce((a: Record<string, number>, c) => {
    a[c] = (a[c] || 0) + 1;
    return a;
  }, {});
};

const OrderInfo = ({ withToken = false }: { withToken?: boolean }) => {
  const { orderCurrent } = useAppSelector((state) => state.orderCurrent);
  const { id } = useParams();
  const { lastMessage } = useAppSelector((state) =>
    withToken ? state.ordersWS : state.ordersAllWS,
  );
  const dispatch = useAppDispatch();
  const { ingredients: allIngredients } = useAppSelector(
    (state) => state.ingredients,
  );
  const [ingredientsCount, setIngredientsCount] = useState<
    Record<string, number>
  >({});
  const location = useLocation();
  const isModal = !!location.state?.background;

  useEffect(() => {
    if (withToken) {
      const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
      if (!token) return;

      dispatch(connectOrders(`${wsOrdersUrl}/orders?token=${token}`));
    } else {
      dispatch(connectOrdersAll(`${wsOrdersUrl}/orders/all`));
    }

    return () => {
      if (withToken) {
        dispatch(disconnectOrders());
      } else {
        dispatch(disconnectOrdersAll());
      }
    };
  }, [dispatch, withToken]);

  useEffect(() => {
    if (!lastMessage) return;
    const order = lastMessage.orders.find((order) => order._id === id);
    if (!order) return;
    dispatch(addOrderCurrent(order));
  }, [dispatch, id, lastMessage]);

  useEffect(() => {
    if (!orderCurrent) return;
    setIngredientsCount(getIngredientsCount(orderCurrent.ingredients));
  }, [orderCurrent]);

  const totalPrice = () => {
    if (!orderCurrent) return;
    const ingredientsCount = getIngredientsCount(orderCurrent.ingredients);
    let sum = 0;

    Object.entries(ingredientsCount).forEach(([ingredient, count]) => {
      const foundIngredient = allIngredients.find(
        (item) => item._id === ingredient,
      );
      if (!foundIngredient) return;
      sum += foundIngredient.price * count;
    });

    return sum;
  };

  if (!orderCurrent) return null;

  const { number, name, status, updatedAt } = orderCurrent;

  return (
    <div className={isModal ? styles.modalContainer : styles.container}>
      <span className={clsx([styles.orderNumber, "iceland-regular"])}>
        #{number}
      </span>
      <h2 className={styles.orderName}>{name}</h2>
      <span
        className={clsx([
          styles.orderStatus,
          status === "done" ? styles.orderStatusSuccess : "",
        ])}
      >
        {OrderStatus[status]}
      </span>
      <h2 className={styles.orderListTitle}>Состав:</h2>
      <Scrollbars style={{ width: "100%", height: 320 }}>
        <ul className={styles.orderList}>
          {Object.entries(ingredientsCount).map(([ingredient, count]) => {
            const foundIngredient = allIngredients.find(
              (item) => item._id === ingredient,
            );
            if (!foundIngredient) return;
            const { name, price, image } = foundIngredient;
            return (
              <li className={styles.orderItem} key={ingredient}>
                <span className={styles.orderItemImgWrapper}>
                  <img
                    className={styles.orderItemImg}
                    src={image}
                    alt="Order Ingredient"
                  />
                </span>
                <span className={styles.orderItemName}>{name}</span>
                <div className={styles.orderItemPriceBlock}>
                  <span
                    className={clsx([styles.orderItemPrice, "iceland-regular"])}
                  >
                    {count} x {price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
      </Scrollbars>
      <div className={styles.orderInfo}>
        <span className={styles.orderTime}>{formatOrderDate(updatedAt)}</span>
        <div className={styles.orderPriceBlock}>
          <span className={clsx([styles.orderPrice, "iceland-regular"])}>
            {totalPrice()}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
