import React, { useEffect, useState } from "react";
import styles from "./AppHeader.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import logoMobile from "../../assets/images/logo-mobile.svg";
import { NavLink, useLocation } from "react-router";
import clsx from "clsx";
import { logout } from "../../services/thunks/logoutThunk";
import { useAppDispatch } from "../../services/hooks";
import { setLogoutState } from "../../services/slices/authSlice";

const AppHeader = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleBurgerMenuClick = () => {
    setBurgerMenuActive(!burgerMenuActive);
  };

  const handleCloseBurgerMenu = () => {
    setBurgerMenuActive(false);
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      dispatch(setLogoutState());
      handleCloseBurgerMenu();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleCloseBurgerMenu();
  }, [location.pathname]);

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
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                Конструктор
              </>
            )}
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `${clsx([styles.tab, isActive ? styles.tabTitleActive : styles.tabTitle])}`
            }
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
          <NavLink to="/">
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
        <li
          className={clsx([
            styles.headerDropdownItem,
            styles.headerDropdownSubmenuItem,
          ])}
        >
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${clsx([styles.tabMobile, isActive ? styles.tabTitleActive : styles.tabTitle])}`
            }
          >
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                Личный кабинет
              </>
            )}
          </NavLink>

          <ul className={styles.submenuList}>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${clsx([styles.tabMobile, isActive ? styles.tabTitleActive : styles.tabTitle])}`
                }
                end
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  `${clsx([styles.tabMobile, isActive ? styles.tabTitleActive : styles.tabTitle])}`
                }
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={handleLogout}
                to="/login"
                className={`${clsx([styles.tabMobile, styles.tabTitle])}`}
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </li>
        <li className={styles.headerDropdownItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${clsx([styles.tabMobile, isActive ? styles.tabTitleActive : styles.tabTitle])}`
            }
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
            to="/feed"
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
