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
import type { DataOrderProps, DataProps } from "../types/types";

type Props = {
  activeOrder: DataOrderProps[];
  setActiveOrder: React.Dispatch<React.SetStateAction<DataOrderProps[]>>;
  constructorBun: DataProps;
};

const BurgerContstuctor = ({
  activeOrder,
  setActiveOrder,
  constructorBun,
}: Props) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setActiveOrder((items) => {
      const oldIndex = items.findIndex((i) => i.uuid === active.id);
      const newIndex = items.findIndex((i) => i.uuid === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <div className={styles.constructorContainer}>
      <div className={styles.constructorInnerContainer}>
        <div className={styles.constructorList}>
          <div className={styles.constructorItem}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={constructorBun.name}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
            />
          </div>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activeOrder.map((el) => el.uuid)}
              strategy={verticalListSortingStrategy}
            >
              <Scrollbars style={{ width: "100%", height: 384 }}>
                <ul className={styles.constructorListScrollable}>
                  {activeOrder.map((el) => (
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
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={constructorBun.name}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
            />
          </div>
        </div>
        <div className={styles.totalBlock}>
          <span className={`${styles.totalText} iceland-regular`}>
            610
            <span className={styles.totalIconWrapper}>
              <CurrencyIcon type="primary" />
            </span>
          </span>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerContstuctor;
