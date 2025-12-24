import bun from "../assets/images/bun.svg";
import type { BurgerIngredientsTabsProps } from "../components/types/types";

export const burgerConstructorData = [
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

export const burgerIngredientsTabs: BurgerIngredientsTabsProps[] = [
  { id: 1, title: "Булки" },
  { id: 2, title: "Соусы" },
  { id: 3, title: "Начинки" },
];
