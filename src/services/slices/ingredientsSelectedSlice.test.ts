import { describe, it, expect } from "vitest";
import reducer, {
  initialState,
  addIngredient,
  removeIngredient,
  shuffleIngredients,
  removeAllIngredients,
} from "./ingredientsSelectedSlice";
import type { IngredientSelected } from "../../types/types";

describe("ingredientsSelectedSlice reducer", () => {
  const ingredient1: IngredientSelected = {
    uuid: "1",
    _id: "a",
    name: "Ingredient 1",
    type: "main",
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: "image.png",
    image_mobile: "image-mobile.png",
    image_large: "image-large.png",
    __v: 0,
  };

  const ingredient2: IngredientSelected = {
    uuid: "2",
    _id: "b",
    name: "Ingredient 2",
    type: "sauce",
    proteins: 5,
    fat: 2,
    carbohydrates: 10,
    calories: 50,
    price: 30,
    image: "image2.png",
    image_mobile: "image2-mobile.png",
    image_large: "image2-large.png",
    __v: 0,
  };

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("should handle addIngredient", () => {
    const action = addIngredient(ingredient1);
    const state = reducer(undefined, action);

    expect(state.ingredientsSelected).toEqual([ingredient1]);
  });

  it("should handle removeIngredient", () => {
    const initialStateWithItems = {
      ingredientsSelected: [ingredient1, ingredient2],
    };
    const state = reducer(initialStateWithItems, removeIngredient("1"));

    expect(state.ingredientsSelected).toEqual([ingredient2]);
  });

  it("should handle shuffleIngredients", () => {
    const newOrder = [ingredient2, ingredient1];
    const state = reducer(undefined, shuffleIngredients(newOrder));

    expect(state.ingredientsSelected).toEqual(newOrder);
  });

  it("should handle removeAllIngredients", () => {
    const initialStateWithItems = {
      ingredientsSelected: [ingredient1, ingredient2],
    };
    const state = reducer(initialStateWithItems, removeAllIngredients());

    expect(state).toEqual(initialState);
  });
});
