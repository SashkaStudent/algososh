const SHORT_DELAY_MS = 600;
const circlesClass = `div[class*="circle_circle"]`;
describe("Последовательность Фибоначчи", () => {
  beforeEach(() => {
    cy.visit(`${cy.config('baseUrl')}/fibonacci`);
  });

  it("Кнопка Рассчитать имеет состояние disable, если в строке ввода пусто", () => {
    cy.get("input").clear();
    cy.get('button[type=submit]').should("be.disabled");
  });

  it("Последовательность длинной 5 генерируется корректно", () => {
    cy.clock();
    const indexes = [0,1,2,3,4];
    const fib = [1,1,2,3,5]

    cy.get("input").type("5").should("have.value", "5")
    cy.get('button[type=submit]').click()

    cy.get(indexes).each(i=>{
      cy.tick(SHORT_DELAY_MS)
      cy.get(circlesClass)
        .should("have.length", i+1)
        .eq(i)
        .contains(fib[i])
    });
  });
});