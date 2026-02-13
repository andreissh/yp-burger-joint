import React, { useState } from "react";
import styles from "./ResetPassword.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { resetPassword } from "../../services/thunks/resetPasswordThunk";
import { useAppDispatch } from "../../services/hooks";

const ResetPassword = () => {
  const [isPassIconVisible, setIsPassIconVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changeIcon = () => {
    setIsPassIconVisible(!isPassIconVisible);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSaveSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ password, token: code })).unwrap();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>Восстановление пароля</h2>
        <form className={styles.resetForm} onSubmit={handleSaveSubmit}>
          <label htmlFor="newPass" className={styles.newPassLabel}>
            <Input
              icon={isPassIconVisible ? "ShowIcon" : "HideIcon"}
              id="newPass"
              placeholder="Введите новый пароль"
              type="text"
              onChange={handlePasswordChange}
              onIconClick={changeIcon}
              onPointerEnterCapture={console.log}
              onPointerLeaveCapture={console.log}
              value={password}
            />
          </label>
          <label htmlFor="code" className={styles.codeLabel}>
            <Input
              id="code"
              onChange={handleCodeChange}
              onPointerEnterCapture={console.log}
              onPointerLeaveCapture={console.log}
              placeholder="Введите код из письма"
              type="text"
              value={code}
            />
          </label>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass={styles.saveBtn}
          >
            Сохранить
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

export default ResetPassword;
