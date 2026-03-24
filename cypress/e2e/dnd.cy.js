import "@4tw/cypress-drag-drop";

describe("Constructor drag & drop", () => {
  beforeEach(() => {
    cy.intercept("GET", "*/ingredients").as("getIngredients");
    cy.visit("/");
    cy.wait("@getIngredients");
  });

  it("should drag a bun ingredient into the constructor", () => {
    cy.addBun();

    cy.shouldHaveBun();
  });

  it("should drag an ingredient after adding bun ingredient into the constructor", () => {
    cy.addBun();
    cy.addIngredient(2);

    cy.getLastIngredient().as("lastIngredient");

    cy.get("@lastIngredient").should("exist");
  });
});
