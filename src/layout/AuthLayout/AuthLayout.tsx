import React from "react";
import { Outlet } from "react-router";
import styles from "./AuthLayout.module.scss";

const AuthLayout = () => {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.pageContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
