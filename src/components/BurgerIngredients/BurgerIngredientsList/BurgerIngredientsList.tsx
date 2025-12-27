import React, { useState } from "react";
import styles from "./BurgerIngredientsList.module.scss";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import type { IngredientOrder, Ingredient } from "../../../types/types";
import Modal from "../../../shared/Modal/Modal";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import { useModal } from "../../../hooks/useModal";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  title: string;
  titleStyle?: React.CSSProperties;
  products: Ingredient[];
  activeOrder: IngredientOrder[];
  onActiveOrder: (arg: Ingredient) => void;
};

const BurgerIngredientsList = ({
  title,
  titleStyle = {},
  products,
  activeOrder,
  onActiveOrder,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(
    null
  );
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleIngredientClick = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient);
    openModal();
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
              <li
                className={styles.productTypeItem}
                key={v._id}
                onClick={() => handleIngredientClick(v)}
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
                {activeOrder.filter((item) => item._id === v._id).length ? (
                  <span className={styles.itemCounter}>
                    {activeOrder.filter((item) => item._id === v._id).length}
                  </span>
                ) : null}
                <Button
                  htmlType="button"
                  type="secondary"
                  size="small"
                  extraClass={styles.addIngredientBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onActiveOrder(v);
                  }}
                >
                  {v.type === "bun" ? "Выбрать" : "Добавить"}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredientsList;
