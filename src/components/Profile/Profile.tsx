import React, { useState } from "react";
import styles from "./Profile.module.scss";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { logoutUser } from "../../services/thunks/logoutThunk";
import { logout } from "../../services/slices/authSlice";
import { updateUserInfo } from "../../services/thunks/updateUserInfoThunk";
import { Link } from "react-router";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: user?.name || "",
    login: user?.email || "",
    password: "",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, name: e.target.value });
  };
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, login: e.target.value });
  };
  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateUserInfo(form));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoutClick = () => {
    try {
      dispatch(logoutUser());
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <aside className={styles.tabs}>
          <ul className={styles.tabsList}>
            <li className={styles.tabsItem}>
              <Link
                to="/profile"
                className={`${styles.tabsLink} ${styles.active}`}
              >
                Профиль
              </Link>
            </li>
            <li className={styles.tabsItem}>
              <Link to="/profile/orders" className={styles.tabsLink}>
                История заказов
              </Link>
            </li>
            <li className={styles.tabsItem}>
              <Link
                to="/login"
                className={styles.tabsLink}
                onClick={handleLogoutClick}
              >
                Выход
              </Link>
            </li>
          </ul>
          <span className={styles.tabsDesc}>
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </aside>
        <form className={styles.profileForm} onSubmit={handleSubmit}>
          <Input
            extraClass={styles.profileFormField}
            icon={"EditIcon"}
            id="name"
            placeholder="Имя"
            type="text"
            value={form.name}
            onChange={handleNameChange}
            onPointerEnterCapture={console.log}
            onPointerLeaveCapture={console.log}
          />
          <Input
            extraClass={styles.profileFormField}
            icon={"EditIcon"}
            id="login"
            placeholder="Логин"
            type="text"
            value={form.login}
            onChange={handleLoginChange}
            onPointerEnterCapture={console.log}
            onPointerLeaveCapture={console.log}
          />
          <Input
            extraClass={styles.profileFormField}
            icon={"EditIcon"}
            id="pass"
            placeholder="Пароль"
            type="text"
            value={form.password}
            onChange={handlePassChange}
            onPointerEnterCapture={console.log}
            onPointerLeaveCapture={console.log}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
