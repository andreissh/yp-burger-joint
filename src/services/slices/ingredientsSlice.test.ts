import { describe, it, expect } from "vitest";
import reducer, { setIngredients } from "./ingredientsSlice";
import { getIngredients } from "../thunks/getIngredientsThunk";
import type { Ingredient } from "../../types/types";

describe("ingredientsSlice reducer", () => {
  const mockIngredients: Ingredient[] = [
    {
      _id: "1",
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
    },
    {
      _id: "2",
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
    },
  ];

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ingredients: [],
      loading: false,
      error: null,
    });
  });

  it("should handle setIngredients", () => {
    const action = setIngredients(mockIngredients);
    const state = reducer(undefined, action);

    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("should handle getIngredients.pending", () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual([]);
  });

  it("should handle getIngredients.fulfilled", () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients,
    };

    const state = reducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBe(null);
  });

  it("should handle getIngredients.rejected with payload", () => {
    const error = { message: "Failed to fetch" };

    const action = {
      type: getIngredients.rejected.type,
      payload: error,
    };

    const state = reducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
    expect(state.ingredients).toEqual([]);
  });

  it("should handle getIngredients.rejected without payload", () => {
    const action = {
      type: getIngredients.rejected.type,
    };

    const state = reducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toEqual({ message: "Unknown error" });
    expect(state.ingredients).toEqual([]);
  });
});
