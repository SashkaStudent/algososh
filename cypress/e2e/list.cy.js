import { COLOR_CHANGING as C_CH, COLOR_DEFAULT as C_D, COLOR_MODIFIED as C_M, host } from "../utils/constants";
const DELAY_MS = 1000;
const circlesClass = `div[class*="circle_circle"]`;
const circlesSmallClass = `div[class*="circle_small"]`;
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
      .eq(0).should("have.css", "border-color", C_D).contains("3");
    cy.tick(DELAY_MS);

    cy.get(circlesSmallClass).should("have.css", "border-color", C_CH).contains("e1");

    cy.tick(DELAY_MS);

    cy.get(circlesClass)
      .eq(0).should("have.css", "border-color", C_M).contains("e1");

    cy.tick(DELAY_MS);

    cy.get(circlesClass).should("have.length", 5);
    cy.get(circlesClassContent)
      .eq(0).contains("head");
    cy.get(circlesClassContent)
      .eq(4).contains("tail");

  });

  it("Корректность добавления элемента в tail", () => {
    cy.clock();

    cy.get('input[name="string"]').type("e5").should("have.value", "e5");
    cy.get("button:contains('Добавить в tail')").click();

    cy.get(circlesSmallClass).should("have.css", "border-color", C_CH).contains("e5");
    cy.tick(DELAY_MS);
    cy.get(circlesClass).not(`${circlesSmallClass}`).should("have.length", 4);
    cy.tick(DELAY_MS);

    cy.get(circlesClass).last().should("have.css", "border-color", C_M).contains("e5");
    cy.get(circlesClass).should("have.length", 5);

    cy.tick(DELAY_MS);
    cy.get(circlesClass).last().should("have.css", "border-color", C_D).contains("e5");

    cy.get(circlesClassContent)
      .eq(0).contains("head");
    cy.get(circlesClassContent)
      .eq(4).contains("tail");


  });
  it("Корректность добавления элемента по индексу", () => {
    cy.clock();
    cy.get('input[name="string"]').type("e1").should("have.value", "e1");
    cy.get('input[name="number"]').type("2").should("have.value", "2");

    cy.get("button:contains('Добавить по индексу')").click();
    cy.tick(DELAY_MS);

    cy.get(circlesSmallClass).should("have.css", "border-color", C_CH).contains("e1");
    cy.get(circlesClass).not(`${circlesSmallClass}`).should("have.length", 4);
    cy.get(circlesClass).not(`${circlesSmallClass}`).eq(0).should("have.css", "border-color", C_CH).contains("3");

    cy.tick(DELAY_MS);

    cy.get(circlesClass).not(`${circlesSmallClass}`).eq(1).should("have.css", "border-color", C_CH).contains("2");

    cy.tick(DELAY_MS);

    cy.get(circlesClass).not(`${circlesSmallClass}`).eq(2).should("have.css", "border-color", C_D).contains("1");

    cy.tick(DELAY_MS);
    cy.get(circlesClass).eq(0).should("have.css", "border-color", C_D).contains("3");
    cy.get(circlesClass).eq(1).should("have.css", "border-color", C_D).contains("2");
    cy.get(circlesClass).eq(2).should("have.css", "border-color", C_M).contains("e1");
    cy.get(circlesClass).eq(3).should("have.css", "border-color", C_D).contains("1");
    cy.get(circlesClass).eq(4).should("have.css", "border-color", C_D).contains("0");
    cy.get(circlesClass).should("have.length", 5);
    cy.get(circlesClassContent)
      .eq(0).contains("head");
    cy.get(circlesClassContent)
      .eq(4).contains("tail");
    
     cy.tick(DELAY_MS);

     cy.get(circlesClass).eq(2).should("have.css", "border-color", C_D).contains("e1");

  });

  it("Корректность удаления элемента из head", () => {
    cy.clock();
    cy.get("button:contains('Удалить из head')").click();
    cy.get(circlesClass).not(`${circlesSmallClass}`).should("have.length", 4);
    cy.tick(DELAY_MS);

    cy.get(circlesClass).not(`${circlesSmallClass}`).eq(0).should("have.text", "");

    cy.get(circlesSmallClass).contains("3");

    cy.tick(DELAY_MS);
    cy.get(circlesClass).should("have.length", 3);
    cy.get(circlesClass).eq(0).should("have.css", "border-color", C_D).contains("2");
    cy.get(circlesClass).eq(1).should("have.css", "border-color", C_D).contains("1");
    cy.get(circlesClass).eq(2).should("have.css", "border-color", C_D).contains("0");

  });

  it("Корректность удаления элемента из tail", () => {
    cy.clock();
    cy.get("button:contains('Удалить из tail')").click();
    cy.get(circlesClass).not(`${circlesSmallClass}`).should("have.length", 4);
    cy.tick(DELAY_MS);

    cy.get(circlesClass).not(`${circlesSmallClass}`).eq(3).should("have.text", "");

    cy.get(circlesSmallClass).contains("0");

    cy.tick(DELAY_MS);
    cy.get(circlesClass).should("have.length", 3);
    cy.get(circlesClass).eq(0).should("have.css", "border-color", C_D).contains("3");
    cy.get(circlesClass).eq(1).should("have.css", "border-color", C_D).contains("2");
    cy.get(circlesClass).eq(2).should("have.css", "border-color", C_D).contains("1");
  });

  it("Корректность удаления элемента по индексу", () => {
    cy.clock();
    cy.get('input[name="number"]').type("2").should("have.value", "2");
    cy.get("button:contains('Удалить по индексу')").click();
    cy.get(circlesClass).should("have.length", 4);

    cy.tick(DELAY_MS);

    cy.get(circlesClass).eq(0).should("have.css", "border-color", C_CH).contains("3");

    cy.tick(DELAY_MS);

    cy.get(circlesClass).eq(1).should("have.css", "border-color", C_CH).contains("2");

    cy.tick(DELAY_MS);

    cy.get(circlesClass).eq(2).should("have.css", "border-color", C_CH).contains("1");

    cy.tick(DELAY_MS);
    cy.get(circlesSmallClass).should("have.css", "border-color", C_CH).contains("1");
    
    cy.tick(DELAY_MS);

    cy.get(circlesClass).should("have.length", 3);
    cy.get(circlesClass).eq(0).should("have.css", "border-color", C_D).contains("3");
    cy.get(circlesClass).eq(1).should("have.css", "border-color", C_D).contains("2");
    cy.get(circlesClass).eq(2).should("have.css", "border-color", C_D).contains("0");

  });

});