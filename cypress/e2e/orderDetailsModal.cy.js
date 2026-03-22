import { baseUrl } from "../../src/utils/consts";

describe("Order details modal", () => {
  beforeEach(() => {
    cy.request("POST", `${baseUrl}/auth/login`, {
      email: "testuser@example.com",
      password: "password123",
    }).then((res) => {
      window.localStorage.setItem("accessToken", res.body.accessToken);
      window.localStorage.setItem("refreshToken", res.body.refreshToken);
    });

    cy.visit("/");
  });

  it("should open order modal with details", () => {
    cy.get('[data-testid="ingredients-section-1"] li button').first().click();
    cy.get('[data-testid="ingredients-section-2"] li button').first().click();

    cy.intercept("POST", `${baseUrl}/orders`).as("createOrder");

    cy.get("button")
      .contains(/Оформить заказ/i)
      .click();

    cy.wait("@createOrder");

    cy.get('[data-testid="modal"]').should("exist").and("be.visible");
    cy.get('[data-testid="order-number"]').should("exist").and("not.be.empty");
    cy.get('[data-testid="order-text"]').should("exist").and("not.be.empty");
    cy.get('[data-testid="modal"]').find("img").should("exist");
    cy.get('[data-testid="modal"]')
      .contains("Ваш заказ начали готовить")
      .should("exist");
    cy.get('[data-testid="modal"]')
      .contains("Дождитесь готовности на орбитальной станции")
      .should("exist");
  });
});
