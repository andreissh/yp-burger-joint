import { describe, it, expect } from "vitest";
import reducer, {
  addCurrentIngredient,
  removeCurrentIngredient,
} from "./ingredientCurrentSlice";
import type { Ingredient } from "../../types/types";

describe("ingredientCurrentSlice reducer", () => {
  const mockIngredient: Ingredient = {
    _id: "1",
    name: "Test Ingredient",
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

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ingredientCurrent: null,
    });
  });

  it("should handle addCurrentIngredient", () => {
    const action = addCurrentIngredient(mockIngredient);
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ingredientCurrent: mockIngredient,
    });
  });

  it("should handle removeCurrentIngredient", () => {
    const initialStateWithIngredient = {
      ingredientCurrent: mockIngredient,
    };

    const state = reducer(
      initialStateWithIngredient,
      removeCurrentIngredient(),
    );

    expect(state).toEqual({
      ingredientCurrent: null,
    });
  });
});
