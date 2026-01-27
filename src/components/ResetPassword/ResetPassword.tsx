import React, { useState } from "react";
import styles from "./ResetPassword.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPassword = () => {
  const [isPassIconVisible, setIsPassIconVisible] = useState(true);

  const changeIcon = () => {
    setIsPassIconVisible(!isPassIconVisible);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Восстановление пароля</h2>
        <form className={styles.resetForm}>
          <label htmlFor="newPass" className={styles.newPassLabel}>
            <Input
              icon={isPassIconVisible ? "ShowIcon" : "HideIcon"}
              id="newPass"
              placeholder="Введите новый пароль"
              type="text"
              onChange={console.log}
              onIconClick={changeIcon}
              onPointerEnterCapture={console.log}
              onPointerLeaveCapture={console.log}
              value=""
            />
          </label>
          <label htmlFor="code" className={styles.codeLabel}>
            <Input
              id="code"
              onChange={console.log}
              onPointerEnterCapture={console.log}
              onPointerLeaveCapture={console.log}
              placeholder="Введите код из письма"
              type="text"
              value=""
            />
          </label>
        </form>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass={styles.saveBtn}
        >
          Сохранить
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

export default ResetPassword;
