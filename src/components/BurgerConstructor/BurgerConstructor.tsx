import React from "react";
import styles from "./BurgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bun from "../../assets/images/bun.svg";

const elements = [
  {
    id: 1,
    text: "Краторная булка N-200i",
    price: 50,
    thumbnail: bun,
  },
  {
    id: 2,
    text: "Краторная булка N-200i",
    price: 50,
    thumbnail: bun,
  },
  {
    id: 3,
    text: "Краторная булка N-200i",
    price: 50,
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
    price: 50,
    thumbnail: bun,
  },
  {
    id: 6,
    text: "Краторная булка N-200i",
    price: 50,
    thumbnail: bun,
  },
];

const BurgerContstuctor = () => {
  return (
    <div className={styles.constructorContainer}>
      <div className={styles.constructorInnerContainer}>
        <div className={styles.constructorList}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={bun}
          />
          <ul className={styles.constructorListScrollable}>
            {elements.map((el) => (
              <li key={el.id}>
                <ConstructorElement
                  text={el.text}
                  price={el.price}
                  thumbnail={el.thumbnail}
                />
              </li>
            ))}
          </ul>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={bun}
          />
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
