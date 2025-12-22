import React from "react";
import styles from "./BurgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bun from "../../assets/images/bun.svg";

const BurgerContstuctor = () => {
  return (
    <div className={styles.constructorContainer}>
      <div className={styles.constructorInnerContainer}>
        <ul className={styles.constructorList}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={bun}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={bun}
          />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={bun}
          />
        </ul>
        <div className={styles.totalBlock}>
          <span className={styles.totalText}>
            610
            <CurrencyIcon type="primary" />
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
