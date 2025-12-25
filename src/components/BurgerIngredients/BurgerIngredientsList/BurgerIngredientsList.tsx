import React, { useEffect, useState } from "react";
import styles from "./BurgerIngredientsList.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { DataOrderProps, DataProps } from "../../types/types";

type Props = {
  title: string;
  titleStyle?: React.CSSProperties;
  products: DataProps[];
  activeOrder: DataOrderProps[];
  onActiveOrder: (arg: DataProps) => void;
};

const BurgerIngredientsList = ({
  title,
  titleStyle = {},
  products,
  activeOrder,
  onActiveOrder,
}: Props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [isMobile]);

  return (
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
              onClick={() => onActiveOrder(v)}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BurgerIngredientsList;
