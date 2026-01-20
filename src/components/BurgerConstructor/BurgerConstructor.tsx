import React from "react";
import styles from "./BurgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem/SortableItem";
import Scrollbars from "rc-scrollbars";
import Modal from "../../shared/Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useModal } from "../../hooks/useModal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../services/hooks";
import { shuffleIngredients } from "../../services/slices/ingredientsOrderSlice";

const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const { data: activeOrder } = useAppSelector(
    (state) => state.ingredientsOrder,
  );
  const constructorBun = activeOrder.find((item) => item.type === "bun");
  const constructorIngredients = activeOrder.filter(
    (item) => item.type !== "bun",
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = activeOrder.findIndex((i) => i.uuid === active.id);
    const newIndex = activeOrder.findIndex((i) => i.uuid === over.id);
    const activeOrderShuffled = arrayMove(activeOrder, oldIndex, newIndex);

    dispatch(shuffleIngredients(activeOrderShuffled));
  };

  return (
    <>
      <div className={styles.constructorContainer}>
        <div className={styles.constructorInnerContainer}>
          <div className={styles.constructorList}>
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
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={constructorIngredients.map((el) => el.uuid)}
                strategy={verticalListSortingStrategy}
              >
                <Scrollbars style={{ width: "100%", height: 384 }}>
                  <ul className={styles.constructorListScrollable}>
                    {constructorIngredients.map((el) => (
                      <SortableItem key={el.uuid} id={el.uuid}>
                        <ConstructorElement
                          text={el.name}
                          price={el.price}
                          thumbnail={el.image}
                        />
                      </SortableItem>
                    ))}
                  </ul>
                </Scrollbars>
              </SortableContext>
            </DndContext>
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
