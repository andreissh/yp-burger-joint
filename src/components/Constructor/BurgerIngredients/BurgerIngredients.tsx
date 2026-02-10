import React, { useEffect, useRef, useState } from "react";
import styles from "./BurgerIngredients.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Scrollbars from "rc-scrollbars";
import { ingredientsTabs } from "../../../utils/utils";
import type { IngredientSelected } from "../../../types/types";
import { useAppSelector } from "../../../services/hooks";
import BurgerIngredientsList from "./BurgerIngredientsList/BurgerIngredientsList";

type Props = {
  onIngredientsSelectedChange: (arg: IngredientSelected) => void;
  onIngredientModalToggle: (arg: string) => void;
};

const BurgerIngredients = ({
  onIngredientsSelectedChange,
  onIngredientModalToggle,
}: Props) => {
  const [activeTab, setActiveTab] = useState(1);
  const { data: ingredients } = useAppSelector((state) => state.ingredients);
  const sections = ingredientsTabs.map((tab) => ({
    ...tab,
    products: ingredients.filter((i) => i.type === tab.type),
  }));
  const scrollContainerRef = useRef<Scrollbars | null>(null);
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const visibleSectionsRef = useRef(
    new Map<number, IntersectionObserverEntry>(),
  );

  const handleTabClick = (value: string) => {
    const id = Number(value);
    setActiveTab(id);

    const container = scrollContainerRef.current?.view;
    const section = sectionRefs.current[id];
    if (container && section) {
      const offset = section.offsetTop;
      container.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const root = document.querySelector(".rc-scrollbars-view");
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = Number(entry.target.getAttribute("data-tab-id"));

          if (entry.isIntersecting) {
            visibleSectionsRef.current.set(id, entry);
          } else {
            visibleSectionsRef.current.delete(id);
          }
        }

        const sorted = Array.from(visibleSectionsRef.current.values()).sort(
          (a, b) => {
            const aTop = Math.abs(a.boundingClientRect.top);
            const bTop = Math.abs(b.boundingClientRect.top);
            return aTop - bTop;
          },
        );

        if (sorted.length > 0) {
          const id = Number(sorted[0].target.getAttribute("data-tab-id"));
          setActiveTab(id);
        }
      },
      { root },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ingredients]);

  return (
    <section className={styles.ingredientsContainer}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <nav className={styles.tabs}>
        <ul className={styles.tabsList}>
          {ingredientsTabs.map((tab) => (
            <Tab
              active={activeTab === tab.id}
              value={`${tab.id}`}
              onClick={handleTabClick}
              key={tab.id}
            >
              {tab.title}
            </Tab>
          ))}
        </ul>
      </nav>
      <div className={styles.tabContainer}>
        <Scrollbars
          style={{ width: "100%", height: 520 }}
          ref={scrollContainerRef}
        >
          {sections.map((section) => {
            return (
              <div
                key={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                data-tab-id={section.id}
              >
                <BurgerIngredientsList
                  title={section.title}
                  titleStyle={section.type === "bun" ? { marginTop: 0 } : {}}
                  products={section.products}
                  onIngredientsSelectedChange={onIngredientsSelectedChange}
                  onIngredientModalToggle={onIngredientModalToggle}
                />
              </div>
            );
          })}
        </Scrollbars>
      </div>
    </section>
  );
};

export default BurgerIngredients;
