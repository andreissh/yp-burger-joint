import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

type Props = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ title, children, onClose }: Props) => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    const newModalRoot = document.createElement("div");
    newModalRoot.id = "modal-root";
    document.body.appendChild(newModalRoot);
  }

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  const modalContent = (
    <ModalOverlay onClick={onClose}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            {title && <h1 className={styles.title}>{title}</h1>}
            <span className={styles.closeIcon} onClick={onClose} />
          </div>
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    </ModalOverlay>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  );
};

export default Modal;
