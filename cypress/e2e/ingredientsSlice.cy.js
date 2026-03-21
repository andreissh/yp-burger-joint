import reducer, {
  setIngredients,
} from "../../src/services/slices/ingredientsSlice";
import { getIngredients } from "../../src/services/thunks/getIngredientsThunk";

describe("ingredientsSlice reducer", () => {
  const mockIngredients = [
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
    },
  ];

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).to.deep.equal({
      ingredients: [],
      loading: false,
      error: null,
    });
  });

  it("should handle setIngredients", () => {
    const action = setIngredients(mockIngredients);
    const state = reducer(undefined, action);

    expect(state.ingredients).to.deep.equal(mockIngredients);
    expect(state.loading).to.equal(false);
    expect(state.error).to.equal(null);
  });

  it("should handle getIngredients.pending", () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(undefined, action);

    expect(state.loading).to.equal(true);
    expect(state.error).to.equal(null);
    expect(state.ingredients).to.deep.equal([]);
  });

  it("should handle getIngredients.fulfilled", () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients,
    };

    const state = reducer(undefined, action);

    expect(state.loading).to.equal(false);
    expect(state.ingredients).to.deep.equal(mockIngredients);
    expect(state.error).to.equal(null);
  });

  it("should handle getIngredients.rejected with payload", () => {
    const error = { message: "Failed to fetch" };

    const action = {
      type: getIngredients.rejected.type,
      payload: error,
    };

    const state = reducer(undefined, action);

    expect(state.loading).to.equal(false);
    expect(state.error).to.deep.equal(error);
    expect(state.ingredients).to.deep.equal([]);
  });

  it("should handle getIngredients.rejected without payload", () => {
    const action = {
      type: getIngredients.rejected.type,
    };

    const state = reducer(undefined, action);

    expect(state.loading).to.equal(false);
    expect(state.error).to.deep.equal({ message: "Unknown error" });
    expect(state.ingredients).to.deep.equal([]);
  });
});
