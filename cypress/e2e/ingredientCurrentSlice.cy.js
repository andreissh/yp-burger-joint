import reducer, {
  addCurrentIngredient,
  removeCurrentIngredient,
} from "../../src/services/slices/ingredientCurrentSlice";

describe("ingredientCurrentSlice reducer", () => {
  const mockIngredient = {
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
  };

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).to.deep.equal({
      ingredientCurrent: null,
    });
  });

  it("should handle addCurrentIngredient", () => {
    const action = addCurrentIngredient(mockIngredient);
    const state = reducer(undefined, action);

    expect(state).to.deep.equal({
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

    expect(state).to.deep.equal({
      ingredientCurrent: null,
    });
  });
});
