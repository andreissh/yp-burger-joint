import React from "react";
import styles from "./BurgerIngredientsList.module.scss";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import type { Ingredient, IngredientSelected } from "../../../types/types";
import Modal from "../../../shared/Modal/Modal";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import { useModal } from "../../../hooks/useModal";
import { useMediaQuery } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { v4 as uuidv4 } from "uuid";
import DraggableIngredient from "./DraggableIngredient/DraggableIngredient";
import {
  addIngredient,
  removeIngredient,
} from "../../../services/slices/ingredientCurrentSlice";

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
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: ingredientsSelected } = useAppSelector(
    (state) => state.ingredientsSelected,
  );
  const dispatch = useAppDispatch();

  const handleIngredientClick = (ingredient: Ingredient) => {
    dispatch(addIngredient(ingredient));
    openModal();
  };

  const handleCloseModal = () => {
    dispatch(removeIngredient());
    closeModal();
  };

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
                  onClick={(e) => {
                    e.stopPropagation();
                    onIngredientsSelectedChange({ ...v, uuid: uuidv4() });
                  }}
                >
                  {v.type === "bun" ? "Выбрать" : "Добавить"}
                </Button>
              </DraggableIngredient>
            );
          })}
        </ul>
      </div>

      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredientsList;
