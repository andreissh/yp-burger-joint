import React, { useCallback, useEffect, useRef } from "react";
import styles from "./BurgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Scrollbars from "rc-scrollbars";
import Modal from "../../../shared/Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import { useModal } from "../../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import {
  removeAllIngredients,
  removeIngredient,
  shuffleIngredients,
} from "../../../services/slices/ingredientsSelectedSlice";
import { useDrop } from "react-dnd";
import { DND_INGREDIENT } from "../../../shared/constants";
import { v4 as uuidv4 } from "uuid";
import type { Ingredient, IngredientSelected } from "../../../types/types";
import { getIngredientsOrder } from "../../../services/thunks/getIngredientsOrderThunk";
import { useNavigate } from "react-router";
import SortableItem from "./SortableItem/SortableItem";

type Props = {
  onIngredientsSelectedChange: (arg: IngredientSelected) => void;
};

const BurgerConstructor = ({ onIngredientsSelectedChange }: Props) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const { data: ingredientsSelected } = useAppSelector(
    (state) => state.ingredientsSelected,
  );
  const constructorBun = ingredientsSelected.find(
    (item) => item.type === "bun",
  );
  const constructorIngredients = ingredientsSelected.filter(
    (item) => item.type !== "bun",
  );
  const totalCost = ingredientsSelected.reduce((a, c) => a + c.price, 0);
  const selectedRef = useRef(ingredientsSelected);
  const { isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [, drop] = useDrop(() => ({
    accept: DND_INGREDIENT,
    drop: (ingredient: Ingredient) => {
      if (ingredient.type !== "bun") {
        if (!selectedRef.current.length) return;
      }
      onIngredientsSelectedChange({ ...ingredient, uuid: uuidv4() });
    },
  }));

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newOrder = [...ingredientsSelected];
      const [dragged] = newOrder.splice(dragIndex, 1);
      newOrder.splice(hoverIndex, 0, dragged);
      dispatch(shuffleIngredients(newOrder));
    },
    [ingredientsSelected, dispatch],
  );

  const handleDeleteIngredient = (uuid: string) => {
    dispatch(removeIngredient(uuid));
  };

  const handleSendOrder = async () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const ingredientsSelectedIds = {
      ingredients: ingredientsSelected.map((order) => order._id),
    };

    try {
      await dispatch(getIngredientsOrder(ingredientsSelectedIds));
      dispatch(removeAllIngredients());
      openModal();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    selectedRef.current = ingredientsSelected;
  }, [ingredientsSelected]);

  return (
    <>
      <div className={styles.constructorContainer}>
        <div className={styles.constructorInnerContainer}>
          <div className={styles.constructorList} ref={drop}>
            {ingredientsSelected.length ? (
              <>
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
                      <SortableItem
                        key={el.uuid}
                        id={el.uuid}
                        moveItem={moveItem}
                      >
                        <ConstructorElement
                          text={el.name}
                          price={el.price}
                          thumbnail={el.image}
                          handleClose={() => handleDeleteIngredient(el.uuid)}
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
              </>
            ) : (
              <div className={styles.constructorListTemplate}>
                Сначала выберите булку, затем ингредиенты для заказа
              </div>
            )}
          </div>
          <div className={styles.totalBlock}>
            <span className={`${styles.totalText} iceland-regular`}>
              {totalCost}
              <span className={styles.totalIconWrapper}>
                <CurrencyIcon type="primary" />
              </span>
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={handleSendOrder}
              disabled={!ingredientsSelected.length}
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
