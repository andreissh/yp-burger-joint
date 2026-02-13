import React, { useState } from "react";
import styles from "./Login.module.scss";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../services/hooks";
import { useLocation, useNavigate } from "react-router";
import { setLoginState } from "../../services/slices/authSlice";
import { login } from "../../services/thunks/loginThunk";

const Login = () => {
  const [isPassIconVisible, setIsPassIconVisible] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const changeIcon = () => {
    setIsPassIconVisible(!isPassIconVisible);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(login(form)).unwrap();
      dispatch(setLoginState(res));
      const { from } = location.state || { from: "/" };
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handlePassRecoverClick = () => {
    navigate("/forgot-password");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Вход</h2>
        <form className={styles.signinForm} onSubmit={handleLoginSubmit}>
          <label htmlFor="email" className={styles.emailLabel}>
            <EmailInput
              value={form.email}
              onChange={handleEmailChange}
              id="email"
            />
          </label>
          <label htmlFor="pass" className={styles.passLabel}>
            <Input
              type="text"
              id="pass"
              value={form.password}
              icon={isPassIconVisible ? "ShowIcon" : "HideIcon"}
              onChange={handlePasswordChange}
              onIconClick={changeIcon}
              onPointerEnterCapture={console.log}
              onPointerLeaveCapture={console.log}
              placeholder="Пароль"
            />
          </label>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass={styles.signinBtn}
          >
            Войти
          </Button>
        </form>
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
