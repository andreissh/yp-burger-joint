import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  loading: boolean;
};

const Modal = ({ title, children, onClose, loading }: Props) => {
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
    if (loading) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [loading, onClose]);

  const modalContent = (
    <ModalOverlay onClick={loading ? undefined : onClose}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {!loading && (
              <span className={styles.closeIcon}>
                <CloseIcon type="primary" onClick={onClose} />
              </span>
            )}
          </div>
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>
    </ModalOverlay>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!,
  );
};

export default Modal;
