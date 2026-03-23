import { useEffect, useState } from "react";
import styles from "./OrderFeed.module.scss";
import clsx from "clsx";
import Scrollbars from "rc-scrollbars";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import type { Order } from "../../types/ws";
import { addOrderCurrent } from "../../services/slices/orderCurrentSlice";
import { useNavigate } from "react-router";
import { formatOrderDate } from "../../utils/utils";
import {
  connectOrdersAll,
  disconnectOrdersAll,
} from "../../services/actions/ordersAllActions";
import { wsOrdersUrl } from "../../utils/consts";

const OrderFeed = () => {
  const { lastMessage, status } = useAppSelector((state) => state.ordersAllWS);
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const [ordersTotal, setOrdersTotal] = useState(0);
  const [ordersTotalToday, setOrdersTotalToday] = useState(0);
  const [ordersDone, setOrdersDone] = useState<number[]>([]);
  const [ordersPending, setOrdersPending] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(status);

  const getTotalPrice = (orderIngredients: string[]) => {
    return orderIngredients.reduce((a: number, c: string) => {
      const ingredient = ingredients.find((ingredient) => ingredient._id === c);

      if (!ingredient) {
        throw new Error(`Ingredient with id ${c} not found in store`);
      }

      return a + ingredient.price;
    }, 0);
  };

  const handleFeedItemClick = (order: Order) => {
    dispatch(addOrderCurrent(order));
    navigate(`/feed/${order._id}`, {
      state: { background: window.location.pathname },
    });
  };

  useEffect(() => {
    dispatch(connectOrdersAll(`${wsOrdersUrl}/orders/all`));

    return () => {
      dispatch(disconnectOrdersAll());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!lastMessage) return;

    const done: number[] = [];
    const pending: number[] = [];

    lastMessage.orders.forEach((order) => {
      if (done.length > 9 && pending.length > 9) return;
      if (order.status === "done") {
        if (done.length <= 9) done.push(order.number);
      } else if (order.status === "pending") {
        if (pending.length <= 9) pending.push(order.number);
      }
    });

    setOrdersTotal(lastMessage.total);
    setOrdersTotalToday(lastMessage.totalToday);
    setOrdersDone(done);
    setOrdersPending(pending);
  }, [lastMessage]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Лента заказов</h1>
      <div className={styles.feedWrapper}>
        <div className={styles.feedContainer}>
          <Scrollbars style={{ width: "100%", height: 700 }}>
            <ul className={styles.feedList}>
              {lastMessage?.orders.map((order) => {
                return (
                  <li
                    className={styles.feedItem}
                    key={order._id}
                    onClick={() => handleFeedItemClick(order)}
                  >
                    <div className={styles.feedItemNumberBlock}>
                      <span
                        className={clsx([
                          styles.feedItemNumber,
                          "iceland-regular",
                        ])}
                      >
                        #{order.number}
                      </span>
                      <span className={styles.feedItemTime}>
                        {formatOrderDate(order.updatedAt)}
                      </span>
                    </div>
                    <h2 className={styles.feedItemName}>{order.name}</h2>
                    <div className={styles.feedItemIngredientsBlock}>
                      <div className={styles.feedItemIngredients}>
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
                              className={styles.feedItemIngredientImgWrapper}
                              key={`${order._id}-ingredient-${i}`}
                            >
                              <img
                                className={styles.feedItemIngredientImg}
                                src={currentIngredient.image_mobile}
                                alt="Ингредиент"
                              />

                              {isLastVisible && (
                                <span
                                  className={styles.feedItemIngredientOverlay}
                                >
                                  +{extraCount}
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                      <div className={styles.feedItemPriceBlock}>
                        <span
                          className={clsx([
                            styles.feedItemPrice,
                            "iceland-regular",
                          ])}
                        >
                          {getTotalPrice(order.ingredients)}
                        </span>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
        </div>
        <div className={styles.feedInfoContainer}>
          <div className={styles.feedOrdersBlock}>
            <div className={styles.feedOrdersReady}>
              <h2 className={styles.feedOrdersReadyTitle}>Готовы:</h2>
              <ul className={styles.feedOrdersReadyList}>
                {ordersDone.map((order) => {
                  return (
                    <li
                      className={clsx([
                        styles.feedOrdersReadyItem,
                        "iceland-regular",
                      ])}
                      key={order}
                    >
                      {order}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.feedOrdersInProgress}>
              <h2 className={styles.feedOrdersInProgressTitle}>В работе:</h2>
              <ul className={styles.feedOrdersInProgressList}>
                {ordersPending.map((order) => {
                  return (
                    <li
                      className={clsx([
                        styles.feedOrdersInProgressItem,
                        "iceland-regular",
                      ])}
                      key={order}
                    >
                      {order}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.feedTotalBlock}>
            <h2 className={styles.feedTotalTitle}>Выполнено за все время:</h2>
            <span className={clsx([styles.feedTotalCount, "iceland-regular"])}>
              {ordersTotal}
            </span>
          </div>
          <div className={styles.feedTodayBlock}>
            <h2 className={styles.feedTodayTitle}>Выполнено за сегодня:</h2>
            <span className={clsx([styles.feedTodayCount, "iceland-regular"])}>
              {ordersTotalToday}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFeed;
