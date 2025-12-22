import React from "react";
import styles from "./AppHeader.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.leftTabs}>
          <div className={styles.tab}>
            <BurgerIcon type="primary" />
            <span className={`${styles.tabTitle} ${styles.tabTitleActive}`}>
              Конструктор
            </span>
          </div>
          <div className={styles.tab}>
            <ListIcon type="secondary" />
            <span className={styles.tabTitle}>Лента заказов</span>
          </div>
        </div>
        <Logo className={styles.logo} />
        <div className={styles.rightTabs}>
          <div className={styles.tab}>
            <ProfileIcon type="secondary" />
            <span className={styles.tabTitle}>Личный кабинет</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
