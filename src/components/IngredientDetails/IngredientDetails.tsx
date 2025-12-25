import React from "react";
import styles from "./IngredientDetails.module.scss";
import type { Ingredient } from "../../types/types";

type Props = {
  ingredient: Ingredient | null;
};

const IngredientDetails = ({ ingredient }: Props) => {
  if (!ingredient) return;

  const { name, calories, fat, proteins, carbohydrates, image } = ingredient;

  const nutritionValueMap = {
    "Калории, ккал": calories,
    "Белки, г": proteins,
    "Жиры, г": fat,
    "Углеводы, г": carbohydrates,
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsImgWrapper}>
        <img className={styles.detailsImg} src={image} alt="ingredient" />
      </div>
      <h2 className={styles.detailsTitle}>{name}</h2>
      <div className={styles.detailsInfoBlock}>
        {Object.entries(nutritionValueMap).map(([key, value]) => (
          <div key={key} className={styles.detailsInfo}>
            <span className={styles.detailsInfoText}>{key}</span>
            <span className={`${styles.detailsInfoValue} iceland-regular`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientDetails;
