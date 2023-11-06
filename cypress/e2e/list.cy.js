import { COLOR_CHANGING as C_CH, COLOR_DEFAULT as C_D, COLOR_MODIFIED as C_M, host } from "../utils/constants";
const DELAY_MS = 1000;
const circlesClass = `div[class*="circle_circle"]`;
const circlesClassContent = `div[class*="circle_content"]`;

describe("Стек", () => {
  beforeEach(() => {
    cy.visit(`${host}/list`);
  });

  it("Кнопки в состоянии disable, если в строке ввода значения и индекса пусто", () => {
    cy.get("input").clear();
    cy.get('button:contains("Добавить")').should("be.disabled");
    cy.get('button:contains("Добавить в head")').should("be.disabled");
    cy.get('button:contains("Добавить в tail")').should("be.disabled");
    cy.get('button:contains("Добавить по индексу")').should("be.disabled");
    cy.get('button:contains("Удалить по индексу")').should("be.disabled");

  });

  it("Корректность отрисовки списка по-умолчанию", () => {
    cy.get(circlesClass)
      .should("not.be.empty")
      .should("have.length", 4);
    
    cy.get(circlesClass)
      .eq(0).should("have.css", "border-color", C_D).contains("3");
    cy.get(circlesClass)
      .eq(1).should("have.css", "border-color", C_D).contains("2");
    cy.get(circlesClass)
      .eq(2).should("have.css", "border-color", C_D).contains("1");
    cy.get(circlesClass)
      .eq(3).should("have.css", "border-color", C_D).contains("0");

    cy.get(circlesClassContent)
      .eq(0).contains("head");
    cy.get(circlesClassContent)
      .eq(3).contains("tail");
  });

  it("Корректность добавления элемента в head", () => {
    cy.clock();

    cy.get('input[name="string"]').type("e1").should("have.value", "e1");
    cy.get("button:contains('Добавить в head')").click();

    cy.get(circlesClass)
    .eq(0).should("have.css", "border-color", C_D).contains("3");;

    cy.tick(DELAY_MS);
    
    cy.get(circlesClass)
    .should("have.length", 5)



  });

});