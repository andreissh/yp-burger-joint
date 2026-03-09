import React from "react";
import styles from "./OrderHistory.module.scss";
import Scrollbars from "rc-scrollbars";
import { Link } from "react-router";
import clsx from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { wsOrdersUrl } from "../../../utils/consts";
import { useAppSelector } from "../../../services/store/hooks";

const OrderHistory = () => {
  const { lastMessage } = useWebSocket(`${wsOrdersUrl}/orders`, true);
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const getTotalPrice = (orderIngredients: string[]) => {
    return orderIngredients.reduce((a: number, c: string) => {
      const ingredient = ingredients.find((ingredient) => ingredient._id === c);

      if (!ingredient) {
        throw new Error(`Ingredient with id ${c} not found in store`);
      }

      return a + ingredient.price;
    }, 0);
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
                <Link
                  className={styles.orderHistoryLink}
                  to={`/profile/orders/${order._id}`}
                  key={order._id}
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
                        {order.updatedAt}
                      </span>
                    </div>
                    <div className={styles.orderHistoryNameBlock}>
                      <h2 className={styles.orderHistoryName}>{order.name}</h2>
                      <span className={styles.orderHistoryStatus}>
                        {order.status}
                      </span>
                    </div>
                    <div className={styles.orderHistoryIngredientsBlock}>
                      <div className={styles.orderHistoryIngredients}>
                        {order.ingredients.map((ingredient, i) => {
                          const currentIngredient = ingredients.find(
                            (item) => item._id === ingredient,
                          );
                          if (!currentIngredient) {
                            throw new Error(
                              `Ingredient with id ${ingredient} not found in store`,
                            );
                          }
                          return (
                            <span
                              className={styles.orderHistoryItemImgWrapper}
                              key={`${order._id}-ingredient-${i}`}
                            >
                              <img
                                className={styles.orderHistoryItemImg}
                                src={currentIngredient.image_mobile}
                                alt="Ингредиент"
                              />
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
                </Link>
              );
            })}
        </ul>
      </Scrollbars>
    </div>
  );
};

export default OrderHistory;
