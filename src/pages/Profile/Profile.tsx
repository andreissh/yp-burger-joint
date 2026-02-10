import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { updateUserInfo } from "../../services/thunks/updateUserInfoThunk";
import { Link } from "react-router";
import { setLogoutState, setUserInfo } from "../../services/slices/authSlice";
import { logout } from "../../services/thunks/logoutThunk";
import { getUserInfo } from "../../services/thunks/getUserInfoThunk";
import Loader from "../../shared/Loader/Loader";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    login: user?.email ?? "",
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
      dispatch(logout());
      dispatch(setLogoutState());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userInfo = await dispatch(getUserInfo()).unwrap();
        dispatch(setUserInfo(userInfo));
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name,
      login: user.email,
      password: "",
    });
  }, [user]);

  if (!user) return <Loader />;

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
