import { baseUrl } from "../../src/utils/consts";
import { SELECTORS } from "./selectors";

Cypress.Commands.add("addBun", () => {
  cy.get(`${SELECTORS.INGREDIENTS_SECTION(1)} li`)
    .first()
    .drag(SELECTORS.CONSTRUCTOR_LIST);
});

Cypress.Commands.add("addIngredient", (section = 2) => {
  cy.get(`${SELECTORS.INGREDIENTS_SECTION(section)} li`)
    .first()
    .drag(SELECTORS.CONSTRUCTOR_LIST);
});

Cypress.Commands.add("getLastIngredient", () => {
  return cy.get(SELECTORS.CONSTRUCTOR_ITEM_INGREDIENT).last();
});

Cypress.Commands.add("shouldHaveBun", () => {
  cy.get(SELECTORS.CONSTRUCTOR_ITEM_BUN(1))
    .should("exist")
    .and("contain.text", "булка");
  cy.get(SELECTORS.CONSTRUCTOR_ITEM_BUN(2))
    .should("exist")
    .and("contain.text", "булка");
});

Cypress.Commands.add("openIngredientModal", () => {
  cy.get(`${SELECTORS.INGREDIENTS_SECTION(1)} li`)
    .first()
    .click();
});

Cypress.Commands.add("getModal", () => {
  return cy.get(SELECTORS.MODAL);
});

Cypress.Commands.add("getModalCloseButton", () => {
  return cy.get(SELECTORS.MODAL_CLOSE);
});

Cypress.Commands.add("getModalOverlay", () => {
  return cy.get(SELECTORS.MODAL_OVERLAY);
});

Cypress.Commands.add("closeModalByButton", () => {
  cy.getModalCloseButton().click();
});

Cypress.Commands.add("closeModalByOverlay", () => {
  cy.getModalOverlay().click({ force: true });
});

Cypress.Commands.add("modalShouldBeVisible", () => {
  cy.getModal().should("exist").and("be.visible");
});

Cypress.Commands.add("modalShouldNotExist", () => {
  cy.getModal().should("not.exist");
});

Cypress.Commands.add("modalShouldHaveTitle", (title) => {
  cy.get(SELECTORS.MODAL_TITLE)
    .first()
    .should("exist")
    .and("contain.text", title);
});

Cypress.Commands.add("modalShouldHaveIngredientImage", () => {
  cy.get(SELECTORS.MODAL_INGREDIENT_IMAGE).should("exist").and("be.visible");
});

Cypress.Commands.add("modalShouldHaveIngredientName", () => {
  cy.get(SELECTORS.MODAL_INGREDIENT_NAME).should("exist").and("not.be.empty");
});

Cypress.Commands.add("modalShouldHaveDetailsCount", (count) => {
  cy.get(SELECTORS.MODAL_ALL_DETAILS).should("have.length", count);
});

Cypress.Commands.add("modalDetailsShouldNotBeEmpty", () => {
  cy.get(SELECTORS.MODAL_ALL_DETAILS).each(($el) => {
    cy.wrap($el).find("span").should("not.be.empty");
  });
});

Cypress.Commands.add("modalShouldContainIngredientDetails", () => {
  cy.modalShouldBeVisible();
  cy.modalShouldHaveTitle("Детали ингредиента");
  cy.modalShouldHaveIngredientImage();
  cy.modalShouldHaveIngredientName();
  cy.modalShouldHaveDetailsCount(4);
  cy.modalDetailsShouldNotBeEmpty();
});

Cypress.Commands.add("loginViaApi", (email, password) => {
  cy.request("POST", `${baseUrl}/auth/login`, {
    email: email,
    password: password,
  }).then((res) => {
    window.localStorage.setItem("refreshToken", res.body.refreshToken);
    window.localStorage.setItem("accessToken", res.body.accessToken);
  });
});

Cypress.Commands.add("addIngredientByButton", (section = 1) => {
  cy.get(`${SELECTORS.INGREDIENTS_SECTION(section)} li button`)
    .first()
    .click();
});

Cypress.Commands.add("submitOrder", () => {
  cy.get(`${SELECTORS.ORDER_SUBMIT}`).click();
});

Cypress.Commands.add("modalShouldHaveOrderDetails", () => {
  cy.get(SELECTORS.MODAL).should("exist").and("be.visible");
  cy.get(SELECTORS.ORDER_NUMBER).should("exist").and("not.be.empty");
  cy.get(SELECTORS.ORDER_TEXT).should("exist").and("not.be.empty");
  cy.get(SELECTORS.MODAL).find("img").should("exist");
  cy.get(SELECTORS.MODAL).contains("Ваш заказ начали готовить").should("exist");
  cy.get(SELECTORS.MODAL)
    .contains("Дождитесь готовности на орбитальной станции")
    .should("exist");
});
