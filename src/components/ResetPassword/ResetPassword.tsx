import React, { useState } from "react";
import styles from "./ResetPassword.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const [isPassIconVisible, setIsPassIconVisible] = useState(true);
  const navigate = useNavigate();

  const changeIcon = () => {
    setIsPassIconVisible(!isPassIconVisible);
  };

  const handleSaveClick = () => {
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
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
          onClick={handleSaveClick}
          type="primary"
          size="large"
          extraClass={styles.saveBtn}
        >
          Сохранить
        </Button>
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

export default ResetPassword;
