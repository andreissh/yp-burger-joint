import { useEffect } from "react";
import styles from "./Profile.module.scss";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { NavLink, Outlet } from "react-router";
import { setLogoutState } from "../../services/slices/authSlice";
import { logout } from "../../services/thunks/logoutThunk";
import { getUserInfo } from "../../services/thunks/getUserInfoThunk";
import { PacmanLoader } from "react-spinners";
import clsx from "clsx";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.profile);

  const handleLogoutClick = () => {
    try {
      dispatch(logout());
      dispatch(setLogoutState());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        await dispatch(getUserInfo());
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [dispatch]);

  if (loading)
    return (
      <div className={styles.loaderWrapper}>
        <PacmanLoader color="var(--bg-color-white)" size={50} />
      </div>
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <aside className={styles.tabs}>
          <ul className={styles.tabsList}>
            <li className={styles.tabsItem}>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${clsx([styles.tabsLink, isActive ? styles.active : ""])}`
                }
                end
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.tabsItem}>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  `${clsx([styles.tabsLink, isActive ? styles.active : ""])}`
                }
              >
                История заказов
              </NavLink>
            </li>
            <li className={styles.tabsItem}>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${clsx([styles.tabsLink, isActive ? styles.active : ""])}`
                }
                onClick={handleLogoutClick}
              >
                Выход
              </NavLink>
            </li>
          </ul>
          <span className={styles.tabsDesc}>
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </aside>

        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
