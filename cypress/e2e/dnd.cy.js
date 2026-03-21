import "@4tw/cypress-drag-drop";

describe("Constructor drag & drop", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should drag a bun ingredient into the constructor", () => {
    cy.get('[data-testid="ingredients-section-1"] li')
      .first()
      .drag('[data-testid="constructor-list"]');

    cy.get('[data-testid="constructor-item-bun-1"]')
      .should("exist")
      .and("contain.text", "булка");

    cy.get('[data-testid="constructor-item-bun-2"]')
      .should("exist")
      .and("contain.text", "булка");
  });

  it("should drag an ingredient after adding bun ingredient into the constructor", () => {
    cy.get('[data-testid="ingredients-section-1"] li')
      .first()
      .drag('[data-testid="constructor-list"]');

    cy.get('[data-testid="ingredients-section-2"] li')
      .first()
      .drag('[data-testid="constructor-list"]');

    cy.get(`[data-testid^="constructor-item-ingredient-"]`)
      .last()
      .as("lastIngredient");

    cy.get("@lastIngredient").should("exist");
  });
});
