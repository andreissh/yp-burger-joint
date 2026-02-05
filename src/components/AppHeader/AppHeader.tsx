import React, { useEffect, useState } from "react";
import styles from "./AppHeader.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import logoMobile from "../../assets/images/logo-mobile.svg";
import { Link, useNavigate } from "react-router";
import clsx from "clsx";

enum Tabs {
  Constructor = "constructor",
  Orders = "orders",
  Account = "account",
}

type TabsType = "constructor" | "orders" | "account";

const AppHeader = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const [activeTab, setActiveTab] = useState<TabsType>(Tabs.Constructor);
  const navigate = useNavigate();

  const handleBurgerMenuClick = () => {
    setBurgerMenuActive(!burgerMenuActive);
  };

  const handleConstructorClick = () => {
    setActiveTab(Tabs.Constructor);
    navigate("/");
  };

  const handleAccountClick = () => {
    setActiveTab(Tabs.Account);
    navigate("/profile");
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
          <Link to="/" className={styles.tab} onClick={handleConstructorClick}>
            <BurgerIcon
              type={activeTab === Tabs.Constructor ? "primary" : "secondary"}
            />
            <span
              className={clsx([
                styles.tabTitle,
                activeTab === Tabs.Constructor && styles.tabTitleActive,
              ])}
            >
              Конструктор
            </span>
          </Link>
          <Link to="/profile/orders" className={styles.tab}>
            <ListIcon
              type={activeTab === Tabs.Orders ? "primary" : "secondary"}
            />
            <span
              className={clsx([
                styles.tabTitle,
                activeTab === Tabs.Orders && styles.tabTitleActive,
              ])}
            >
              Лента заказов
            </span>
          </Link>
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
          <Link
            to="/profile"
            className={styles.tab}
            onClick={handleAccountClick}
          >
            <ProfileIcon
              type={activeTab === Tabs.Account ? "primary" : "secondary"}
            />
            <span
              className={clsx([
                styles.tabTitle,
                activeTab === Tabs.Account && styles.tabTitleActive,
              ])}
            >
              Личный кабинет
            </span>
          </Link>
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
          <Link to="/profile" onClick={handleAccountClick}>
            <ProfileIcon
              type={activeTab === Tabs.Account ? "primary" : "secondary"}
            />
            <span
              className={clsx([
                styles.tabTitle,
                activeTab === Tabs.Account && styles.tabTitleActive,
              ])}
            >
              Личный кабинет
            </span>
          </Link>
        </li>
        <li className={styles.headerDropdownItem}>
          <Link to="/" onClick={handleConstructorClick}>
            <BurgerIcon
              type={activeTab === Tabs.Constructor ? "primary" : "secondary"}
            />
            <span
              className={clsx([
                styles.tabTitle,
                activeTab === Tabs.Constructor && styles.tabTitleActive,
              ])}
            >
              Конструктор
            </span>
          </Link>
        </li>
        <li className={styles.headerDropdownItem}>
          <Link to="/profile/orders">
            <ListIcon
              type={activeTab === Tabs.Orders ? "primary" : "secondary"}
            />
            <span
              className={clsx([
                styles.tabTitle,
                activeTab === Tabs.Orders && styles.tabTitleActive,
              ])}
            >
              Лента заказов
            </span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;
