import React, { useState } from "react";
import styles from "./BurgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bun from "../../assets/images/bun.svg";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem/SortableItem";

const data = [
  {
    id: 1,
    text: "Краторная булка N-200i",
    price: 450,
    thumbnail: bun,
  },
  {
    id: 2,
    text: "Краторная булка N-200i",
    price: 350,
    thumbnail: bun,
  },
  {
    id: 3,
    text: "Краторная булка N-200i",
    price: 500,
    thumbnail: bun,
  },
  {
    id: 4,
    text: "Краторная булка N-200i",
    price: 50,
    thumbnail: bun,
  },
  {
    id: 5,
    text: "Краторная булка N-200i",
    price: 250,
    thumbnail: bun,
  },
  {
    id: 6,
    text: "Краторная булка N-200i",
    price: 150,
    thumbnail: bun,
  },
];

const BurgerContstuctor = () => {
  const dataCopy = structuredClone(data);
  const [elements, setElements] = useState(dataCopy);
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setElements((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
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
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={bun}
            />
          </div>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={elements.map((el) => el.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className={styles.constructorListScrollable}>
                {elements.map((el) => (
                  <SortableItem key={el.id} id={el.id}>
                    <ConstructorElement
                      text={el.text}
                      price={el.price}
                      thumbnail={el.thumbnail}
                    />
                  </SortableItem>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
          <div className={styles.constructorItem}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={bun}
            />
          </div>
        </div>
        <div className={styles.totalBlock}>
          <span className={`${styles.totalText} iceland-regular`}>
            610
            <span style={{ scale: "1.4" }}>
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
