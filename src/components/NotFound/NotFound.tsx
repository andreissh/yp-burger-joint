import React from "react";
import styles from "./NotFound.module.scss";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.header}>404</h1>
        <span className={styles.desc}>Страница не найдена</span>
        <Button htmlType="button" type="secondary" onClick={handleRefresh}>
          На главную
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
