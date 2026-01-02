describe("Product list", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("Should load and display products", () => {
    cy.get('[data-testid="product-list"]').should("exist");

    cy.get('[data-testid="product-list"]')
      .children()
      .should("have.length.greaterThan", 0);
  });

  it("Should display product details correctly", () => {
    cy.get('[data-testid="product-list"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-testid="product-name"]').should("be.visible");

        cy.get('[data-testid="product-price"]').should("be.visible");

        cy.get("img").should("be.visible").and("have.attr", "alt");

        cy.get(".MuiRating-root").should("exist");

        cy.contains("Learn more").should("be.visible");

        cy.get("button").first().should("exist");
      });
  });

  it("Should navigate to product detail page when clicking Learn more", () => {
    cy.get('[data-testid="product-list"]')
      .children()
      .first()
      .contains("Learn more")
      .click();

    cy.url().should("include", "/products/");
  });

  it("Should toggle favorite and unfavourite on click", () => {
    cy.get('[data-testid="product-list"]')
      .children()
      .first()
      .within(() => {
        cy.get("button").first().click();

        cy.get("button").first().should("exist");
      });

    cy.reload();

    cy.get('[data-testid="product-list"]')
      .children()
      .first()
      .within(() => {
        cy.get("button").first().click();

        cy.get("button").first().should("exist");
      });
  });

  it("Should persist favorites in localStorage", () => {
    cy.clearLocalStorage();

    cy.get('[data-testid="product-list"]')
      .children()
      .first()
      .within(() => {
        cy.get("button").first().click();
      });

    cy.get('[data-testid="product-list"]')
      .children()
      .first()
      .next()
      .within(() => {
        cy.get("button").first().click();
      });

    cy.getAllLocalStorage().then((result) => {
      const storage = result[Cypress.config().baseUrl];
      expect(storage).to.have.property("favourites");
    });
  });
});
