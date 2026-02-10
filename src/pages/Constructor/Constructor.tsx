import React, { useEffect, useRef, useState } from "react";
import styles from "./Constructor.module.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/Constructor/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/Constructor/BurgerConstructor/BurgerConstructor";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import type { IngredientSelected } from "../../types/types";
import {
  addIngredient,
  removeIngredient,
} from "../../services/slices/ingredientsSelectedSlice";
import { useParams } from "react-router";
import IngredientPage from "../IngredientPage/IngredientPage";
import { setIngredients } from "../../services/slices/ingredientsSlice";
import { getIngredients } from "../../services/thunks/getIngredientsThunk";

const Constructor = () => {
  const { loading, error } = useAppSelector((state) => state.ingredients);
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { data: ingredientsSelected } = useAppSelector(
    (state) => state.ingredientsSelected,
  );
  const ingredientsSelectedRef = useRef(ingredientsSelected);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(
    localStorage.getItem("isIngredientModalOpen"),
  );
  const params = useParams();

  const handleIngredientModalToggle = (value: string) =>
    setIsIngredientModalOpen(value);

  const handleIngredientsSelectedChange = (item: IngredientSelected) => {
    const currentOrder = ingredientsSelectedRef.current;

    if (item.type === "bun") {
      const buns = currentOrder.filter((item) => item.type === "bun");
      if (buns.length) {
        buns.forEach((bun) => {
          dispatch(removeIngredient(bun.uuid));
          dispatch(addIngredient(item));
        });
      } else {
        for (let i = 0; i < 2; i++) {
          dispatch(addIngredient(item));
        }
      }
    } else {
      dispatch(addIngredient(item));
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await dispatch(getIngredients()).unwrap();
        dispatch(setIngredients(response));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [dispatch, isAuth]);

  useEffect(() => {
    ingredientsSelectedRef.current = ingredientsSelected;
  }, [ingredientsSelected]);

  useEffect(() => {
    if (!isIngredientModalOpen) return;
    localStorage.setItem("isIngredientModalOpen", isIngredientModalOpen);
  }, [isIngredientModalOpen]);

  if (loading) {
    return <div className={styles.loader}>Загрузка ингредиентов...</div>;
  }

  if (error) {
    return (
      <div className={styles.loadError}>
        Произошла ошибка при загрузке данных. Попробуйте перезагрузить страницу.
      </div>
    );
  }

  if (params.id && isIngredientModalOpen !== "true") {
    return <IngredientPage />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients
        onIngredientsSelectedChange={handleIngredientsSelectedChange}
        onIngredientModalToggle={handleIngredientModalToggle}
      />
      <BurgerConstructor
        onIngredientsSelectedChange={handleIngredientsSelectedChange}
      />
    </DndProvider>
  );
};

export default Constructor;
