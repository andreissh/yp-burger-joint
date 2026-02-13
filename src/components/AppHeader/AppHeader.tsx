import React, { useEffect, useState } from "react";
import styles from "./AppHeader.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import logoMobile from "../../assets/images/logo-mobile.svg";
import { NavLink, useNavigate } from "react-router";
import clsx from "clsx";

const AppHeader = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const navigate = useNavigate();

  const handleBurgerMenuClick = () => {
    setBurgerMenuActive(!burgerMenuActive);
  };

  const handleConstructorClick = () => {
    navigate("/");
  };

  const handleOrderHistoryClick = () => {
    navigate("/profile/orders");
  };

  const handleAccountClick = () => {
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${clsx([styles.tab, isActive ? styles.tabTitleActive : styles.tabTitle])}`
            }
            onClick={handleConstructorClick}
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                Конструктор
              </>
            )}
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `${clsx([styles.tab, isActive ? styles.tabTitleActive : styles.tabTitle])}`
            }
            onClick={handleOrderHistoryClick}
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                Лента заказов
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logoWrapper}>
          <NavLink to="/" onClick={handleConstructorClick}>
            <Logo className={styles.logo} />
            <img
              className={styles.logoMobile}
              src={logoMobile}
              alt="stellar burger mobile logo"
            />
          </NavLink>
        </div>
        <div className={styles.rightTabs}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${clsx([styles.tab, isActive ? styles.tabTitleActive : styles.tabTitle])}`
            }
            onClick={handleAccountClick}
            end
          >
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                Личный кабинет
              </>
            )}
          </NavLink>
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
        className={clsx([
          styles.headerDropdownList,
          burgerMenuActive ? styles.active : "",
        ])}
      >
        <li className={styles.headerDropdownItem}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${clsx([styles.tabMobile, isActive ? styles.tabTitleActive : styles.tabTitle])}`
            }
            onClick={handleAccountClick}
            end
          >
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                Личный кабинет
              </>
            )}
          </NavLink>
        </li>
        <li className={styles.headerDropdownItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${clsx([styles.tabMobile, isActive ? styles.tabTitleActive : styles.tabTitle])}`
            }
            onClick={handleConstructorClick}
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                Конструктор
              </>
            )}
          </NavLink>
        </li>
        <li className={styles.headerDropdownItem}>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `${clsx([styles.tabMobile, isActive ? styles.tabTitleActive : styles.tabTitle])}`
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                Лента заказов
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;
