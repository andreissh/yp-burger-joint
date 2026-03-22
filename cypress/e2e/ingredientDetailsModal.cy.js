describe("Ingredient modal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open modal with ingredient details", () => {
    cy.get('[data-testid="ingredients-section-1"] li')
      .first()
      .as("firstIngredient");

    cy.get("@firstIngredient").click();

    cy.get('[data-testid="modal"]').should("exist").and("be.visible");
    cy.get('[data-testid="modal"] h2')
      .first()
      .should("exist")
      .and("contain.text", "Детали ингредиента");
    cy.get('[data-testid="modal"]').find("img").should("exist");
    cy.get('[data-testid="modal"] h2')
      .last()
      .should("exist")
      .and("not.be.empty");
    cy.get('[data-testid^="details-info-"]').should("have.length", 4);
    cy.get('[data-testid^="details-info-"] span').each(($el) => {
      cy.wrap($el).should("not.be.empty");
    });
  });

  it("should close modal on clicking close button", () => {
    cy.get('[data-testid="ingredients-section-1"] li').first().click();

    cy.get('[data-testid="modal"]').should("exist").and("be.visible");

    cy.get('[data-testid="modal"] [data-testid="modal-close"]').click();

    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("should close modal on clicking outside (overlay)", () => {
    cy.get('[data-testid="ingredients-section-1"] li').first().click();

    cy.get('[data-testid="modal"]').should("exist").and("be.visible");

    cy.get('[data-testid="modal-overlay"]').click({ force: true });

    cy.get('[data-testid="modal"]').should("not.exist");
  });
});
