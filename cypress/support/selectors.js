export const SELECTORS = {
  CONSTRUCTOR_LIST: '[data-testid="constructor-list"]',
  CONSTRUCTOR_ITEM_BUN: (index) =>
    `[data-testid="constructor-item-bun-${index}"]`,
  CONSTRUCTOR_ITEM_INGREDIENT: '[data-testid^="constructor-item-ingredient-"]',

  INGREDIENTS_SECTION: (section) =>
    `[data-testid="ingredients-section-${section}"]`,

  MODAL: '[data-testid="modal"]',
  MODAL_CLOSE: '[data-testid="modal-close"]',
  MODAL_OVERLAY: '[data-testid="modal-overlay"]',

  MODAL_TITLE: '[data-testid="modal"] h2',
  MODAL_INGREDIENT_IMAGE: '[data-testid="modal"] img',
  MODAL_INGREDIENT_NAME: '[data-testid="modal"] h2:last',
  MODAL_DETAILS_INFO: (type) => `[data-testid="details-info-${type}"]`,
  MODAL_ALL_DETAILS: '[data-testid^="details-info-"]',

  ORDER_SUBMIT: '[data-cy="order-submit"]',
  ORDER_NUMBER: '[data-testid="order-number"]',
  ORDER_TEXT: '[data-testid="order-text"]',
};
