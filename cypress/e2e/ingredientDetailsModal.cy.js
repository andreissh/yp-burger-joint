describe("Ingredient details modal", () => {
  beforeEach(() => {
    cy.intercept("GET", "*/ingredients").as("getIngredients");
    cy.visit("/");
    cy.wait("@getIngredients");
  });

  it("should open modal with ingredient details", () => {
    cy.openIngredientModal();

    cy.modalShouldContainIngredientDetails();
  });
});
