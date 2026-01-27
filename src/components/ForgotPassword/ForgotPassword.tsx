import React from "react";
import styles from "./ForgotPassword.module.scss";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPassword = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Восстановление пароля</h2>
        <form className={styles.resetForm}>
          <label htmlFor="email" className={styles.emailLabel}>
            <EmailInput
              value=""
              onChange={console.log}
              id="email"
              placeholder="Укажите e-mail"
            />
          </label>
        </form>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass={styles.resetBtn}
        >
          Восстановить
        </Button>
        <span className={styles.signinText}>
          Вспомнили пароль?{" "}
          <a href="#" className={styles.signinLink}>
            Войти
          </a>
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
