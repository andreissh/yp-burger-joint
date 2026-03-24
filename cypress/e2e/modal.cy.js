describe("Modal", () => {
  beforeEach(() => {
    cy.intercept("GET", "*/ingredients").as("getIngredients");
    cy.visit("/");
    cy.wait("@getIngredients");
  });

  it("should close modal on clicking close button", () => {
    cy.openIngredientModal();

    cy.modalShouldBeVisible();

    cy.closeModalByButton();

    cy.modalShouldNotExist();
  });

  it("should close modal on clicking outside (overlay)", () => {
    cy.openIngredientModal();

    cy.modalShouldBeVisible();

    cy.closeModalByOverlay();

    cy.modalShouldNotExist();
  });
});
