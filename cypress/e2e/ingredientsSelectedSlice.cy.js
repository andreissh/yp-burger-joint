import reducer, {
  addIngredient,
  removeIngredient,
  shuffleIngredients,
  removeAllIngredients,
} from "../../src/services/slices/ingredientsSelectedSlice";

describe("ingredientsSelectedSlice reducer", () => {
  const ingredient1 = {
    uuid: "1",
    _id: "a",
    name: "Ingredient 1",
  };

  const ingredient2 = {
    uuid: "2",
    _id: "b",
    name: "Ingredient 2",
  };

  it("should return the initial state", () => {
    const action = { type: "" };
    const state = reducer(undefined, action);

    expect(state).to.deep.equal({
      ingredientsSelected: [],
    });
  });

  it("should handle addIngredient", () => {
    const action = addIngredient(ingredient1);
    const state = reducer(undefined, action);

    expect(state.ingredientsSelected).to.deep.equal([ingredient1]);
  });

  it("should handle removeIngredient", () => {
    const initialStateWithItems = {
      ingredientsSelected: [ingredient1, ingredient2],
    };

    const state = reducer(initialStateWithItems, removeIngredient("1"));

    expect(state.ingredientsSelected).to.deep.equal([ingredient2]);
  });

  it("should handle shuffleIngredients", () => {
    const newOrder = [ingredient2, ingredient1];

    const state = reducer(undefined, shuffleIngredients(newOrder));

    expect(state.ingredientsSelected).to.deep.equal(newOrder);
  });

  it("should handle removeAllIngredients", () => {
    const initialStateWithItems = {
      ingredientsSelected: [ingredient1, ingredient2],
    };

    const state = reducer(initialStateWithItems, removeAllIngredients());

    expect(state.ingredientsSelected).to.deep.equal([]);
  });
});
