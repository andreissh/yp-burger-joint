import React, { useEffect, useState } from "react";
import styles from "./AppHeader.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import logoMobile from "../../assets/images/logo-mobile.svg";

const AppHeader = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const handleBurgerMenuClick = () => {
    setBurgerMenuActive(!burgerMenuActive);
  };

  useEffect(() => {
    document.body.classList.toggle("no-scroll", burgerMenuActive);

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [burgerMenuActive]);

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
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} />
          <img
            className={styles.logoMobile}
            src={logoMobile}
            alt="logo-mobile"
          />
        </div>
        <div className={styles.rightTabs}>
          <div className={styles.tab}>
            <ProfileIcon type="secondary" />
            <span className={styles.tabTitle}>Личный кабинет</span>
          </div>
          <span
            className={`${styles.burgerMenu} ${
              burgerMenuActive ? styles.active : ""
            }`}
            onClick={handleBurgerMenuClick}
          >
            <span className={styles.burgerMenuUp}></span>
            <span className={styles.burgerMenuMiddle}></span>
            <span className={styles.burgerMenuBottom}></span>
          </span>
        </div>
      </div>
      <ul
        className={`${styles.headerDropdownList} ${
          burgerMenuActive ? styles.active : ""
        }`}
      >
        <li className={styles.headerDropdownItem}>
          <ProfileIcon type="secondary" />
          <span className={styles.tabTitle}>Личный кабинет</span>
        </li>
        <li className={styles.headerDropdownItem}>
          <BurgerIcon type="primary" />
          <span className={`${styles.tabTitle} ${styles.tabTitleActive}`}>
            Конструктор
          </span>
        </li>
        <li className={styles.headerDropdownItem}>
          <ListIcon type="secondary" />
          <span className={styles.tabTitle}>Лента заказов</span>
        </li>
      </ul>
    </div>
  );
};

export default AppHeader;
