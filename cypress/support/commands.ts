/// <reference types="cypress" />

/* eslint-disable @typescript-eslint/no-namespace */

Cypress.Commands.add("getByDataTest", (dataTestSelector) =>
  cy.get(`[data-testid="${dataTestSelector}"]`)
);

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Script error")) {
    return false;
  }
});

export {};
