import { COLOR_CHANGING as C_CH, COLOR_DEFAULT as C_D, COLOR_MODIFIED as C_M } from "../utils/constants";
const DELAY_MS = 1000;
const circlesClass = `div[class*="circle_circle"]`;


describe("Разворот строки", () => {
  beforeEach(() => {
    cy.visit(`${cy.config('baseUrl')}/recursion`);
  });

  it("Кнопка Развернуть имеет состояние disable, если в строке ввода пусто", () => {
    cy.get("input").clear();
    cy.get('button[type=submit]').should("be.disabled");
  });

  const lettersAndColors = (string, colors) => {
    const chars = [...string];
    const arr = chars.map((item, index) => {
      return { letter: item, color: colors[index] };
    });
    return arr;
  }

  it("Разворот строки WORLD осуществляется корректно", () => {

    const string = "world";
    const items = [
      lettersAndColors("world", [C_CH, C_D, C_D, C_D, C_CH]),
      lettersAndColors("dorlw", [C_M, C_CH, C_D, C_CH, C_M]),
      lettersAndColors("dlrow", [C_M, C_M, C_CH, C_M, C_M]),
      lettersAndColors("dlrow", [C_M, C_M, C_M, C_M, C_M]),
    ];

    const indexes = [...string].map((item, index) => index);
    const indexesItem = items.map((item, index) => index);

    cy.get("input").type(string).should("have.value", string)
    cy.get('button[type=submit]').click()

    cy.clock();

    cy.get(indexesItem).each((i) => {
      cy.get(indexes).each((j) => {
        cy.get(circlesClass)
          .eq(j)
          .should("have.css", "border-color", items[i][j].color)
          .contains(items[i][j].letter);
      });

      cy.tick(DELAY_MS);
    });
  });
});