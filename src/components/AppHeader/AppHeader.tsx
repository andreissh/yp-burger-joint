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
    <header className={styles.headerWrapper}>
      <nav className={styles.headerContainer}>
        <div className={styles.leftTabs}>
          <a className={styles.tab} href="#">
            <BurgerIcon type="primary" />
            <span className={`${styles.tabTitle} ${styles.tabTitleActive}`}>
              Конструктор
            </span>
          </a>
          <a className={styles.tab} href="#">
            <ListIcon type="secondary" />
            <span className={styles.tabTitle}>Лента заказов</span>
          </a>
        </div>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} />
          <img
            className={styles.logoMobile}
            src={logoMobile}
            alt="stellar burger mobile logo"
          />
        </div>
        <div className={styles.rightTabs}>
          <a className={styles.tab} href="#">
            <ProfileIcon type="secondary" />
            <span className={styles.tabTitle}>Личный кабинет</span>
          </a>
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
      </nav>
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
    </header>
  );
};

export default AppHeader;
