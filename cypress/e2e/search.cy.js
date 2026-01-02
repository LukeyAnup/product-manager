describe("Product Search Component", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("Should accept text input", () => {
    cy.get("[data-testid=search]")
      .type("laptop")
      .should("have.value", "laptop");
  });

  it("Should filter products based on search query", () => {
    const query = "ess";
    cy.get("[data-testid=search]").type(query);

    cy.wait(500);

    cy.get('[data-testid="product-list"]').children().should("exist");

    cy.get('[data-testid="product-name"]').each(($name) => {
      const text = $name.text().toLowerCase();
      expect(text).to.include(query);
    });
  });

  it("Should clear search when input is cleared", () => {
    cy.get("[data-testid=search]")
      .type("test")
      .clear()
      .should("have.value", "");

    cy.get('[data-testid="product-list"]')
      .children()
      .should("have.length.greaterThan", 0);
  });

  it("Should show no results message for non-matching search", () => {
    cy.get("[data-testid=search]").type("xyznonexistentproduct123");

    cy.wait(500);

    cy.contains("There are no products mathing this filter").should(
      "be.visible"
    );
  });

  it("Should persist search filter on details page navigation", () => {
    const query = "ess";
    cy.get("[data-testid=search]").type(query);

    cy.wait(500);

    cy.get('[data-testid="product-list"]')
      .children()
      .first()
      .contains("Learn more")
      .click();

    cy.go("back");

    cy.get("[data-testid=search]").should("have.value", query);
  });

  it("Should clear search text on reset", () => {
    cy.get("[data-testid=search]").type("Ess");

    cy.contains("Reset").click();

    cy.get("[data-testid=search]").should("have.value", "");
  });
});
