import React, { useCallback } from "react";
import styles from "./BurgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import SortableItem from "./SortableItem/SortableItem";
import Scrollbars from "rc-scrollbars";
import Modal from "../../shared/Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useModal } from "../../hooks/useModal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../services/hooks";
import { shuffleIngredients } from "../../services/slices/ingredientsOrderSlice";
import { useDrop } from "react-dnd";
import { DND_INGREDIENT } from "../../shared/constants";
import { v4 as uuidv4 } from "uuid";
import type { Ingredient, IngredientOrder } from "../../types/types";

type Props = {
  onActiveOrder: (arg: IngredientOrder) => void;
};

const BurgerConstructor = ({ onActiveOrder }: Props) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const { data: activeOrder } = useAppSelector(
    (state) => state.ingredientsOrder,
  );
  const constructorBun = activeOrder.find((item) => item.type === "bun");
  const constructorIngredients = activeOrder.filter(
    (item) => item.type !== "bun",
  );

  const [, drop] = useDrop(() => ({
    accept: DND_INGREDIENT,
    drop: (ingredient: Ingredient) => {
      const ingredientOrder = { ...ingredient, uuid: uuidv4() };
      onActiveOrder(ingredientOrder);
    },
  }));

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newOrder = [...activeOrder];
      const [dragged] = newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, dragged);
      dispatch(shuffleIngredients(newOrder));
    },
    [activeOrder, dispatch],
  );

  return (
    <>
      <div className={styles.constructorContainer}>
        <div className={styles.constructorInnerContainer}>
          <div className={styles.constructorList} ref={drop}>
            <div className={styles.constructorItem}>
              {constructorBun && (
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${constructorBun.name} (верх)`}
                  price={constructorBun.price}
                  thumbnail={constructorBun.image}
                />
              )}
            </div>
            <Scrollbars style={{ width: "100%", height: 384 }}>
              <ul className={styles.constructorListScrollable}>
                {constructorIngredients.map((el) => (
                  <SortableItem key={el.uuid} id={el.uuid} moveItem={moveItem}>
                    <ConstructorElement
                      text={el.name}
                      price={el.price}
                      thumbnail={el.image}
                    />
                  </SortableItem>
                ))}
              </ul>
            </Scrollbars>
            <div className={styles.constructorItem}>
              {constructorBun && (
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${constructorBun.name} (низ)`}
                  price={constructorBun.price}
                  thumbnail={constructorBun.image}
                />
              )}
            </div>
          </div>
          <div className={styles.totalBlock}>
            <span className={`${styles.totalText} iceland-regular`}>
              610
              <span className={styles.totalIconWrapper}>
                <CurrencyIcon type="primary" />
              </span>
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={openModal}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
