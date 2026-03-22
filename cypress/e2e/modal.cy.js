describe("Modal", () => {
  beforeEach(() => {
    cy.visit("/");
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
