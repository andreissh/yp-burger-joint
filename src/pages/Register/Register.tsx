import React, { useState } from "react";
import styles from "./Register.module.scss";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../services/hooks";
import { setLoginState } from "../../services/slices/authSlice";
import { register } from "../../services/thunks/registerThunk";

const Register = () => {
  const [isPassIconVisible, setIsPassIconVisible] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, name: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value });
  };

  const changeIcon = () => {
    setIsPassIconVisible(!isPassIconVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await dispatch(register(form)).unwrap();
      dispatch(setLoginState(res));
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Регистрация</h2>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.loginLabel}>
            <Input
              type="text"
              id="name"
              value={form.name}
              onChange={handleNameChange}
              onPointerEnterCapture={console.log}
              onPointerLeaveCapture={console.log}
              placeholder="Имя"
            />
          </label>
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
