import React from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import { Outlet } from "react-router";
import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  return (
    <div className={styles.pageWrapper}>
      <AppHeader />
      <main className={styles.pageContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
