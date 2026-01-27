import React, { useEffect } from "react";
import styles from "./IngredientPage.module.scss";
import IngredientDetails from "../../shared/IngredientDetails/IngredientDetails";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { addIngredient } from "../../services/slices/ingredientCurrentSlice";

const IngredientPage = () => {
  const { data: ingredients } = useAppSelector((store) => store.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addIngredient(ingredients[0]));
  }, [dispatch, ingredients]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
