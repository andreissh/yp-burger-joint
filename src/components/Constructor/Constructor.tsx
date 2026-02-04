import React, { useEffect, useRef, useState } from "react";
import styles from "./Constructor.module.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import type { IngredientSelected } from "../../types/types";
import {
  addIngredient,
  removeIngredient,
} from "../../services/slices/ingredientsSelectedSlice";
import { fetchIngredients } from "../../services/thunks/ingredientsThunk";
import { useParams } from "react-router";
import IngredientPage from "../IngredientPage/IngredientPage";
import { getUserInfo } from "../../api/getUserInfo";
import { setIsAuth } from "../../services/slices/authSlice";

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
  const accessToken = localStorage.getItem("accessToken");

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
    const getUserData = async () => {
      try {
        await getUserInfo(accessToken);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    ingredientsSelectedRef.current = ingredientsSelected;
  }, [ingredientsSelected]);

  useEffect(() => {
    if (!isIngredientModalOpen) {
      localStorage.setItem("isIngredientModalOpen", "false");
      setIsIngredientModalOpen("false");
    }
  }, [isIngredientModalOpen]);

  if (loading) {
    return <div className="loader">Загрузка ингредиентов...</div>;
  }

  if (error) {
    return (
      <div className="load-error">
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
      />
      <BurgerConstructor
        onIngredientsSelectedChange={handleIngredientsSelectedChange}
      />
    </DndProvider>
  );
};

export default Constructor;
