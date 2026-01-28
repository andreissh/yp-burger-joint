import React, { useState } from "react";
import styles from "./Login.module.scss";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../services/hooks";
import { setIsAuth } from "../../services/slices/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [isPassIconVisible, setIsPassIconVisible] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeIcon = () => {
    setIsPassIconVisible(!isPassIconVisible);
  };

  const handleLoginClick = () => {
    dispatch(setIsAuth(true));
    navigate("/", { replace: true });
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handlePassRecoverClick = () => {
    navigate("/forgot-password");
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
          onClick={handleLoginClick}
          type="primary"
          size="large"
          extraClass={styles.signinBtn}
        >
          Войти
        </Button>
        <span className={styles.signupText}>
          Вы - новый пользователь?
          <Button
            htmlType="button"
            onClick={handleRegisterClick}
            type="secondary"
            size="small"
            extraClass={styles.signupLink}
          >
            Зарегистрироваться
          </Button>
        </span>
        <span className={styles.recoverText}>
          Забыли пароль?
          <Button
            htmlType="button"
            onClick={handlePassRecoverClick}
            type="secondary"
            size="small"
            extraClass={styles.resetPassLink}
          >
            Восстановить пароль
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Login;
