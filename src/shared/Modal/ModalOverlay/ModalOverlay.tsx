import React from "react";
import styles from "./ModalOverlay.module.scss";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const ModalOverlay = ({ onClick, children }: Props) => {
  return (
    <div className={styles.modalOverlay} onClick={onClick}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default ModalOverlay;
