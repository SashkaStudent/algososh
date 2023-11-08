import { circles, host } from "../utils/constants.js";

const SHORT_DELAY_MS = 600;
const circlesClass = `div[class*="circle_circle"]`;
describe("Последовательность Фибоначчи", () => {
  beforeEach(() => {
    cy.visit(`${host}/fibonacci`);
  });

  it("Кнопка Рассчитать имеет состояние disable, если в строке ввода пусто", () => {
    cy.get("input").clear();
    cy.get('button[type=submit]').should("be.disabled");
  });

  it("Последовательность длинной 5 генерируется корректно", () => {
    cy.get("input").type("5").should("have.value", "5")
    cy.get('button[type=submit]').click()

    cy.wait(SHORT_DELAY_MS)
    cy.get(circlesClass)
      .should("have.length", 1)
      .eq(0)
      .contains("1")

    cy.wait(SHORT_DELAY_MS)
    cy.get(circlesClass)
      .should("have.length", 2)
      .eq(1)
      .contains("1")

    cy.wait(SHORT_DELAY_MS)
    cy.get(circlesClass)
      .should("have.length", 3)
      .eq(2)
      .contains("2")

    cy.wait(SHORT_DELAY_MS)
    cy.get(circlesClass)
      .should("have.length", 4)
      .eq(3)
      .contains("3")

    cy.wait(SHORT_DELAY_MS)
    cy.get(circlesClass)
      .should("have.length", 5)
      .eq(4)
      .contains("5")
  });
});