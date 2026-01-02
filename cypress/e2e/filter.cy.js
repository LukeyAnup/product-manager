describe("Product Filter Component", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("Should display filter component on desktop", () => {
    cy.contains("Product Filters").should("be.visible");
    cy.contains("Price Range").should("be.visible");
    cy.contains("Rating").should("be.visible");
    cy.contains("Reset").should("be.visible");
  });

  it("Should filter products by minimum price", () => {
    cy.get('[data-testid="minimum"]').type(20);

    cy.wait(500);

    cy.get("body").then(($body) => {
      if ($body.find('[data-testid="product-list"]').length > 0) {
        cy.get('[data-testid="product-list"]')
          .children(":visible")
          .each(($price) => {
            const price = parseFloat($price.text().replace(/[^0-9.]/g, ""));
            cy.get('[data-testid="minimum"]')
              .invoke("val")
              .then((val) => {
                const minPrice = parseFloat(val);
                expect(price).to.be.gte(minPrice);
              });
          });
      } else {
        cy.log("No products returned for this filter");
      }
    });
  });

  it("Should filter products by maximum price", () => {
    cy.get('[data-testid="maximum"]').type(20);

    cy.wait(500);

    cy.get("body").then(($body) => {
      if ($body.find('[data-testid="product-list"]').length > 0) {
        cy.get('[data-testid="product-list"]')
          .children(":visible")
          .each(($price) => {
            const price = parseFloat($price.text().replace(/[^0-9.]/g, ""));
            cy.get('[data-testid="maximum"]')
              .invoke("val")
              .then((val) => {
                const minPrice = parseFloat(val);
                expect(price).to.be.lte(minPrice);
              });
          });
      } else {
        cy.log("No products returned for this filter");
      }
    });
  });

  it("Should filter products by price range", () => {
    cy.get('[data-testid="minimum"]').type(20);
    cy.get('[data-testid="maximum"]').type(100);

    cy.wait(500);

    cy.get('[data-testid="minimum"]')
      .invoke("val")
      .then((min) => {
        const minPrice = parseFloat(min);

        cy.get('[data-testid="maximum"]')
          .invoke("val")
          .then((max) => {
            const maxPrice = parseFloat(max);

            cy.get('[data-testid="product-price"]:visible').each(($price) => {
              const price = parseFloat($price.text().replace(/[^0-9.]/g, ""));
              expect(price).to.be.gte(minPrice);
              expect(price).to.be.lte(maxPrice);
            });
          });
      });
  });

  it("Should reset filters when clicking Reset", () => {
    cy.get('[data-testid="minimum"]').type(50);
    cy.get('[data-testid="maximum"]').type(200);

    cy.contains("Reset").click();

    cy.get('[data-testid="minimum"]').should("have.value", "");
    cy.get('[data-testid="maximum"]').should("have.value", "");
  });

  it("Should accept only numeric input in price fields", () => {
    cy.get('[data-testid="minimum"]').type("abc").should("have.value", "");
    cy.get('[data-testid="maximum"]').type("abc").should("have.value", "");

    cy.get('[data-testid="minimum"]')
      .clear()
      .type("123")
      .should("have.value", "123");

    cy.get('[data-testid="maximum"]')
      .clear()
      .type("123")
      .should("have.value", "123");
  });

  it("Should not accept negative values", () => {
    cy.get('[data-testid="minimum"]').should("have.attr", "min", 0);
    cy.get('[data-testid="maximum"]').should("have.attr", "min", 0);
  });

  it("Should persist filter state on details page navigation", () => {
    cy.get('[data-testid="minimum"]').type(40);
    cy.get('[data-testid="maximum"]').type(120);

    cy.get('[data-testid="product-list"]')
      .children()
      .first()
      .contains("Learn more")
      .click();

    cy.go("back");

    cy.get('[data-testid="minimum"]').should("have.value", 40);
    cy.get('[data-testid="maximum"]').should("have.value", 120);
  });
});
