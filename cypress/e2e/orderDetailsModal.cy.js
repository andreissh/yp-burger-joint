describe("Order details modal", () => {
  beforeEach(() => {
    cy.loginViaApi("testuser@example.com", "password123");
    cy.intercept("GET", "*/ingredients").as("getIngredients");
    cy.visit("/");
    cy.wait("@getIngredients");
  });

  it("should open order modal with details", () => {
    cy.addIngredientByButton(1);
    cy.addIngredientByButton(2);
    cy.intercept("POST", "*/orders").as("createOrder");
    cy.submitOrder();
    cy.wait("@createOrder");

    cy.modalShouldHaveOrderDetails();
  });
});
