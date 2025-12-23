import React, { useEffect, useState } from "react";
import styles from "./BurgerIngredientsType.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { DataProps } from "../../types/types";

type Props = {
  title: string;
  titleStyle?: React.CSSProperties;
  products: DataProps[];
};

const BurgerIngredientsType = ({ title, titleStyle = {}, products }: Props) => {
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
            <li className={styles.productTypeItem} key={v._id}>
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
              {/* <span className={styles.itemCounter}>1</span> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BurgerIngredientsType;
