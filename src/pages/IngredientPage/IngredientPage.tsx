import React from "react";
import styles from "./IngredientPage.module.scss";
import IngredientDetails from "../../shared/IngredientDetails/IngredientDetails";

const IngredientPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
