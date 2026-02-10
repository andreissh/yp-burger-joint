import React, { useEffect } from "react";
import styles from "./IngredientPage.module.scss";
import IngredientDetails from "../../shared/IngredientDetails/IngredientDetails";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useParams } from "react-router";
import { addCurrentIngredient } from "../../services/slices/ingredientCurrentSlice";

const IngredientPage = () => {
  const { data: ingredients } = useAppSelector((store) => store.ingredients);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    if (!ingredient) return;
    dispatch(addCurrentIngredient(ingredient));
  }, [dispatch, id, ingredients]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
