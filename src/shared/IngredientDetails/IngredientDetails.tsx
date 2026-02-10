import React, { useEffect } from "react";
import styles from "./IngredientDetails.module.scss";
import { useMediaQuery } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useParams } from "react-router";
import { addCurrentIngredient } from "../../services/slices/ingredientCurrentSlice";

const IngredientDetails = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1280px)");
  const { data: ingredients } = useAppSelector((store) => store.ingredients);
  const { data: ingredient } = useAppSelector(
    (store) => store.ingredientCurrent,
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);
    if (!ingredient) return;
    dispatch(addCurrentIngredient(ingredient));
  }, [dispatch, id, ingredients]);

  if (!ingredient) return null;

  const {
    name,
    calories,
    fat,
    proteins,
    carbohydrates,
    image,
    image_large,
    image_mobile,
  } = ingredient;

  const nutritionValueMap = {
    "Калории, ккал": calories,
    "Белки, г": proteins,
    "Жиры, г": fat,
    "Углеводы, г": carbohydrates,
  };

  const getImg = () => {
    if (isMobile) return image_mobile;
    if (isLargeDesktop) return image_large;
    return image;
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsImgWrapper}>
        <img className={styles.detailsImg} src={getImg()} alt={name} />
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
