import React from "react";
import styles from "./OrderHistory.module.scss";
import Scrollbars from "rc-scrollbars";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { wsOrdersUrl } from "../../../utils/consts";
import { useAppDispatch, useAppSelector } from "../../../services/store/hooks";
import type { Order } from "../../../types/ws";
import { addOrderCurrent } from "../../../services/slices/orderCurrentSlice";
import { OrderStatus } from "../../../types/types";
import { formatOrderDate } from "../../../utils/utils";

const OrderHistory = () => {
  const { lastMessage } = useWebSocket(`${wsOrdersUrl}/orders`, true);
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getTotalPrice = (orderIngredients: string[]) => {
    return orderIngredients.reduce((a: number, c: string) => {
      const ingredient = ingredients.find((ingredient) => ingredient._id === c);

      if (!ingredient) {
        throw new Error(`Ingredient with id ${c} not found in store`);
      }

      return a + ingredient.price;
    }, 0);
  };

  const handleOrderItemClick = (order: Order) => {
    dispatch(addOrderCurrent(order));
    navigate(`/profile/orders/${order._id}`, {
      state: { background: window.location.pathname },
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.orderHistoryTitle}>История заказов</h1>
      <Scrollbars style={{ width: "100%", height: 700 }}>
        <ul className={styles.orderHistoryList}>
          {lastMessage?.orders
            .slice()
            .reverse()
            .map((order) => {
              return (
                <li
                  className={styles.orderHistoryLink}
                  key={order._id}
                  onClick={() => handleOrderItemClick(order)}
                >
                  <li className={styles.orderHistoryItem}>
                    <div className={styles.orderHistoryNumberBlock}>
                      <span
                        className={clsx([
                          styles.orderHistoryNumber,
                          "iceland-regular",
                        ])}
                      >
                        {order.number}
                      </span>
                      <span className={styles.orderHistoryTime}>
                        {formatOrderDate(order.updatedAt)}
                      </span>
                    </div>
                    <div className={styles.orderHistoryNameBlock}>
                      <h2 className={styles.orderHistoryName}>{order.name}</h2>
                      <span
                        className={clsx(
                          styles.orderHistoryStatus,
                          order.status === "done"
                            ? styles.orderHistoryStatusSuccess
                            : "",
                        )}
                      >
                        {OrderStatus[order.status]}
                      </span>
                    </div>
                    <div className={styles.orderHistoryItemsBlock}>
                      <div className={styles.orderHistoryItems}>
                        {order.ingredients.slice(0, 6).map((ingredient, i) => {
                          const currentIngredient = ingredients.find(
                            (item) => item._id === ingredient,
                          );

                          if (!currentIngredient) {
                            throw new Error(
                              `Ingredient with id ${ingredient} not found in store`,
                            );
                          }

                          const extraCount = order.ingredients.length - 5;
                          const isLastVisible =
                            i === 5 && order.ingredients.length > 6;

                          return (
                            <span
                              className={styles.orderHistoryItemImgWrapper}
                              key={`${order._id}-item-${i}`}
                            >
                              <img
                                className={styles.orderHistoryItemImg}
                                src={currentIngredient.image_mobile}
                                alt="Ингредиент"
                              />

                              {isLastVisible && (
                                <span
                                  className={styles.orderHistoryItemOverlay}
                                >
                                  +{extraCount}
                                </span>
                              )}
                            </span>
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
                          {getTotalPrice(order.ingredients)}
                        </span>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  </li>
                </li>
              );
            })}
        </ul>
      </Scrollbars>
    </div>
  );
};

export default OrderHistory;
