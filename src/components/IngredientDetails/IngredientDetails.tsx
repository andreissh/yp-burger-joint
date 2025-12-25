import React from "react";
import styles from "./IngredientDetails.module.scss";
import orderAccepted from "../../assets/images/order-accepted.svg";

const IngredientDetails = () => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsImgWrapper}>
        <img className={styles.detailsImg} src={orderAccepted} alt="" />
      </div>
      <h2 className={styles.detailsTitle}>
        Биокотлета из марсианской Магнолии
      </h2>
      <div className={styles.detailsInfoBlock}>
        <div className={styles.detailsInfo}>
          <span className={styles.detailsInfoText}>Калории, ккал</span>
          <span className={`${styles.detailsInfoValue} iceland-regular`}>
            100
          </span>
        </div>
        <div className={styles.detailsInfo}>
          <span className={styles.detailsInfoText}>Калории, ккал</span>
          <span className={`${styles.detailsInfoValue} iceland-regular`}>
            100
          </span>
        </div>
        <div className={styles.detailsInfo}>
          <span className={styles.detailsInfoText}>Калории, ккал</span>
          <span className={`${styles.detailsInfoValue} iceland-regular`}>
            100
          </span>
        </div>
        <div className={styles.detailsInfo}>
          <span className={styles.detailsInfoText}>Калории, ккал</span>
          <span className={`${styles.detailsInfoValue} iceland-regular`}>
            100
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
