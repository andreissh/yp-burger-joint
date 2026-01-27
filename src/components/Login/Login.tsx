import React, { useState } from "react";
import styles from "./Login.module.scss";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Login = () => {
  const [isPassIconVisible, setIsPassIconVisible] = useState(true);

  const changeIcon = () => {
    setIsPassIconVisible(!isPassIconVisible);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Вход</h2>
        <form className={styles.signinForm}>
          <label htmlFor="email" className={styles.emailLabel}>
            <EmailInput value="" onChange={console.log} id="email" />
          </label>
          <label htmlFor="pass" className={styles.passLabel}>
            <Input
              type="text"
              id="pass"
              value=""
              icon={isPassIconVisible ? "ShowIcon" : "HideIcon"}
              onChange={console.log}
              onIconClick={changeIcon}
              onPointerEnterCapture={console.log}
              onPointerLeaveCapture={console.log}
              placeholder="Пароль"
            />
          </label>
        </form>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass={styles.signinBtn}
        >
          Войти
        </Button>
        <span className={styles.signupText}>
          Вы - новый пользователь?{" "}
          <a href="#" className={styles.signupLink}>
            Зарегистрироваться
          </a>
        </span>
        <span className={styles.recoverText}>
          Забыли пароль?{" "}
          <a href="#" className={styles.resetPassLink}>
            Восстановить пароль
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
