import React, { useEffect, type SyntheticEvent } from "react";
import styles from "./BurgerIngredientsList.module.scss";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMediaQuery } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import DraggableIngredient from "./DraggableIngredient/DraggableIngredient";
import { useNavigate, useParams } from "react-router";
import type { Ingredient, IngredientSelected } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../services/hooks";
import { addCurrentIngredient } from "../../../../services/slices/ingredientCurrentSlice";

type Props = {
  title: string;
  titleStyle?: React.CSSProperties;
  products: Ingredient[];
  onIngredientsSelectedChange: (arg: IngredientSelected) => void;
};

const BurgerIngredientsList = ({
  title,
  titleStyle = {},
  products,
  onIngredientsSelectedChange,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { data: ingredients } = useAppSelector((state) => state.ingredients);
  const { data: ingredientsSelected } = useAppSelector(
    (state) => state.ingredientsSelected,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleIngredientClick = (ingredient: Ingredient) => {
    dispatch(addCurrentIngredient(ingredient));
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: window.location.pathname },
    });
  };

  const handleAddIngredientClick = (e: SyntheticEvent, v: Ingredient) => {
    e.stopPropagation();
    if (v.type !== "bun") {
      if (!ingredientsSelected.length) return;
    }
    onIngredientsSelectedChange({ ...v, uuid: uuidv4() });
  };

  useEffect(() => {
    if (params.id) {
      const ingredient = ingredients.find(
        (ingredient) => ingredient._id === params.id,
      );
      if (!ingredient) return;
      dispatch(addCurrentIngredient(ingredient));
    }
  }, [dispatch, ingredients, params.id]);

  return (
    <>
      <div className={styles.productTypeBlock}>
        <h2 className={styles.productTypeTitle} style={titleStyle}>
          {title}
        </h2>
        <ul className={styles.productTypeList}>
          {products.map((v) => {
            return (
              <DraggableIngredient
                key={v._id}
                ingredient={v}
                onIngredientClick={handleIngredientClick}
              >
                <div className={styles.itemImgWrapper}>
                  <img
                    className={styles.itemImg}
                    src={isMobile ? v.image_mobile : v.image}
                    alt={v.name}
                  />
                </div>
                <span className={`${styles.itemPrice} iceland-regular`}>
                  {v.price}
                  <CurrencyIcon type="primary" />
                </span>
                <span className={styles.itemName}>{v.name}</span>
                {ingredientsSelected.filter(
                  (item) => item._id === v._id && item.type !== "bun",
                ).length ? (
                  <span className={styles.itemCounter}>
                    {
                      ingredientsSelected.filter(
                        (item) => item._id === v._id && item.type !== "bun",
                      ).length
                    }
                  </span>
                ) : null}
                <Button
                  htmlType="button"
                  type="secondary"
                  size="small"
                  extraClass={styles.addIngredientBtn}
                  onClick={(e) => handleAddIngredientClick(e, v)}
                >
                  {v.type === "bun" ? "Выбрать" : "Добавить"}
                </Button>
              </DraggableIngredient>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default BurgerIngredientsList;
