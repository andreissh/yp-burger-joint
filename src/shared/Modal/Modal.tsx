import React from "react";
import styles from "./Modal.module.scss";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const Modal = () => {
  return (
    <ModalOverlay>
      <div className={styles.modalWrapper}></div>
    </ModalOverlay>
  );
};

export default Modal;
