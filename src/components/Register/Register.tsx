import React, { useState } from "react";
import styles from "./Register.module.scss";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../services/hooks";
import { setIsAuth } from "../../services/slices/authSlice";

const Register = () => {
  const [isPassIconVisible, setIsPassIconVisible] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeIcon = () => {
    setIsPassIconVisible(!isPassIconVisible);
  };

  const handleRegisterClick = () => {
    dispatch(setIsAuth(true));
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Регистрация</h2>
        <form className={styles.signupForm}>
          <label htmlFor="login" className={styles.loginLabel}>
            <Input
              type="text"
              id="login"
              value=""
              onChange={console.log}
              onPointerEnterCapture={console.log}
              onPointerLeaveCapture={console.log}
              placeholder="Имя"
            />
          </label>
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
          <Button
            htmlType="button"
            onClick={handleRegisterClick}
            type="primary"
            size="large"
            extraClass={styles.signupBtn}
          >
            Зарегистрироваться
          </Button>
        </form>
        <span className={styles.signupText}>
          Уже зарегистрированы?
          <Button
            htmlType="button"
            onClick={handleLoginClick}
            type="secondary"
            size="small"
            extraClass={styles.signinLink}
          >
            Войти
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Register;
