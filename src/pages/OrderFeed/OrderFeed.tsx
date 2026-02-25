import React from "react";
import styles from "./OrderFeed.module.scss";
import clsx from "clsx";
import Scrollbars from "rc-scrollbars";
import { Link } from "react-router";

const OrderFeed = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Лента заказов</h1>
      <div className={styles.feedWrapper}>
        <div className={styles.feedContainer}>
          <Scrollbars style={{ width: "100%", height: 700 }}>
            <ul className={styles.feedList}>
              <Link to="/feed/1">
                <li className={styles.feedItem}></li>
              </Link>
              <Link to="/feed/1">
                <li className={styles.feedItem}></li>
              </Link>
              <Link to="/feed/1">
                <li className={styles.feedItem}></li>
              </Link>
              <Link to="/feed/1">
                <li className={styles.feedItem}></li>
              </Link>
              <Link to="/feed/1">
                <li className={styles.feedItem}></li>
              </Link>
            </ul>
          </Scrollbars>
        </div>
        <div className={styles.feedInfoContainer}>
          <div className={styles.feedOrdersBlock}>
            <div className={styles.feedOrdersReady}>
              <h2 className={styles.feedOrdersReadyTitle}>Готовы:</h2>
              <ul className={styles.feedOrdersReadyList}>
                <li
                  className={clsx([
                    styles.feedOrdersReadyItem,
                    "iceland-regular",
                  ])}
                >
                  034533
                </li>
              </ul>
            </div>
            <div className={styles.feedOrdersInProgress}>
              <h2 className={styles.feedOrdersInProgressTitle}>В работе:</h2>
              <ul className={styles.feedOrdersInProgressList}>
                <li
                  className={clsx([
                    styles.feedOrdersInProgressItem,
                    "iceland-regular",
                  ])}
                >
                  034538
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.feedTotalBlock}>
            <h2 className={styles.feedTotalTitle}>Выполнено за все время:</h2>
            <span className={clsx([styles.feedTotalCount, "iceland-regular"])}>
              28752
            </span>
          </div>
          <div className={styles.feedTodayBlock}>
            <h2 className={styles.feedTodayTitle}>Выполнено за сегодня:</h2>
            <span className={clsx([styles.feedTodayCount, "iceland-regular"])}>
              138
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFeed;
