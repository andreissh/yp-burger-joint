import React from "react";
import styles from "./Profile.module.scss";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

const Profile = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <aside className={styles.tabs}>
          <ul className={styles.tabsList}>
            <li className={styles.tabsItem}>
              <a href="#" className={`${styles.tabsLink} ${styles.active}`}>
                Профиль
              </a>
            </li>
            <li className={styles.tabsItem}>
              <a href="#" className={styles.tabsLink}>
                История заказов
              </a>
            </li>
            <li className={styles.tabsItem}>
              <a href="#" className={styles.tabsLink}>
                Выход
              </a>
            </li>
          </ul>
          <span className={styles.tabsDesc}>
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </aside>
        <form className={styles.profileForm}>
          <Input
            extraClass={styles.profileFormField}
            icon={"EditIcon"}
            id="name"
            placeholder="Имя"
            type="text"
            value=""
            onChange={console.log}
            onPointerEnterCapture={console.log}
            onPointerLeaveCapture={console.log}
          />
          <Input
            extraClass={styles.profileFormField}
            icon={"EditIcon"}
            id="login"
            placeholder="Логин"
            type="text"
            value=""
            onChange={console.log}
            onPointerEnterCapture={console.log}
            onPointerLeaveCapture={console.log}
          />
          <Input
            extraClass={styles.profileFormField}
            icon={"EditIcon"}
            id="pass"
            placeholder="Пароль"
            type="text"
            value=""
            onChange={console.log}
            onPointerEnterCapture={console.log}
            onPointerLeaveCapture={console.log}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
