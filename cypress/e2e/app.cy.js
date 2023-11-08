describe("Работоспособность приложения", () => {
  it("Работает", () => {
    cy.visit(cy.config('baseUrl'));
  });
});