import React from "react";
import styles from "./ModalOverlay.module.scss";

type Props = {
  children: React.ReactNode;
};

const ModalOverlay = ({ children }: Props) => {
  return <div className={styles.modalOverlay}>{children}</div>;
};

export default ModalOverlay;
