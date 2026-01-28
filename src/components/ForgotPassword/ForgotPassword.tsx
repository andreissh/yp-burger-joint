import React from "react";
import styles from "./ForgotPassword.module.scss";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { useResetPassword } from "../../hooks/useResetPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { allowResetPassword } = useResetPassword();

  const handleRecoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    allowResetPassword();
    navigate("/reset-password");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Восстановление пароля</h2>
        <form className={styles.resetForm} onSubmit={handleRecoverSubmit}>
          <label htmlFor="email" className={styles.emailLabel}>
            <EmailInput
              value=""
              onChange={console.log}
              id="email"
              placeholder="Укажите e-mail"
            />
          </label>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass={styles.resetBtn}
          >
            Восстановить
          </Button>
        </form>
        <span className={styles.signinText}>
          Вспомнили пароль?
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

export default ForgotPassword;
