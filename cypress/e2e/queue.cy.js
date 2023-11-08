import { COLOR_CHANGING as C_CH, COLOR_DEFAULT as C_D } from "../utils/constants";
const DELAY_MS = 500;
const circlesClass = `div[class*="circle_circle"]`;
const circlesClassContent = `div[class*="circle_content"]`;

describe("Стек", () => {
  beforeEach(() => {
    cy.visit(`${cy.config('baseUrl')}/queue`);
  });

  it("Кнопка Добавить имеет состояние disable, если в строке ввода пусто", () => {
    cy.get("input").clear();
    cy.get('button:contains("Добавить")').should("be.disabled");

  });

  it("Добавление элементов в очередь", () => {
    cy.clock();
    cy.get("input").type("e0").should("have.value", "e0");
    cy.get('button:contains("Добавить")').click();

    cy.get(circlesClass)
      .eq(0)
      .should("have.css", "border-color", C_CH)
      .contains("e0");

    cy.get(circlesClassContent)
      .eq(0).contains("head");

    cy.get(circlesClassContent)
      .eq(0).contains("tail");

    cy.tick(DELAY_MS);
    
    cy.get("input").type("e1").should("have.value", "e1");
    cy.get('button:contains("Добавить")').click();
    
    cy.get(circlesClass)
    .eq(0)
    .should("have.css", "border-color", C_D)
    .contains("e0");

    cy.get(circlesClass)
    .eq(1)
    .should("have.css", "border-color", C_CH)
    .contains("e1");

    cy.get(circlesClassContent)
    .eq(0).contains("head");

   cy.get(circlesClassContent)
    .eq(0).contains("tail").should('not.exist');

    cy.get(circlesClassContent)
    .eq(1).contains("head").should('not.exist');

   cy.get(circlesClassContent)
    .eq(1).contains("tail");

    cy.tick(DELAY_MS);
    
    cy.get("input").type("e2").should("have.value", "e2");
    cy.get('button:contains("Добавить")').click();

    cy.get(circlesClass)
    .eq(0)
    .should("have.css", "border-color", C_D)
    .contains("e0");

    cy.get(circlesClass)
    .eq(1)
    .should("have.css", "border-color", C_D)
    .contains("e1");

    cy.get(circlesClass)
    .eq(2)
    .should("have.css", "border-color", C_CH)
    .contains("e2");

    cy.get(circlesClassContent)
    .eq(0).contains("head");

   cy.get(circlesClassContent)
    .eq(0).contains("tail").should('not.exist');

    cy.get(circlesClassContent)
    .eq(1).contains("head").should('not.exist');

   cy.get(circlesClassContent)
    .eq(1).contains("tail").should('not.exist');

    cy.get(circlesClassContent)
    .eq(2).contains("head").should('not.exist');

   cy.get(circlesClassContent)
    .eq(2).contains("tail");
  });


  it("Удаление элементов из очереди", () => {
    cy.clock();
    cy.get("input").type("e0").should("have.value", "e0");
    cy.get('button:contains("Добавить")').click();

    cy.get(circlesClass)
      .eq(0)
      .should("have.css", "border-color", C_CH)
      .contains("e0");

    cy.tick(DELAY_MS);
    
    cy.get("input").type("e1").should("have.value", "e1");
    cy.get('button:contains("Добавить")').click();
    
    cy.get(circlesClass)
    .eq(0)
    .should("have.css", "border-color", C_D)
    .contains("e0");

    cy.get(circlesClass)
    .eq(1)
    .should("have.css", "border-color", C_CH)
    .contains("e1");

    cy.tick(DELAY_MS);
    
    cy.get("input").type("e2").should("have.value", "e2");
    cy.get('button:contains("Добавить")').click();

    cy.get(circlesClass)
    .eq(0)
    .should("have.css", "border-color", C_D)
    .contains("e0");

    cy.get(circlesClass)
    .eq(1)
    .should("have.css", "border-color", C_D)
    .contains("e1");

    cy.get(circlesClass)
    .eq(2)
    .should("have.css", "border-color", C_CH)
    .contains("e2");

    cy.tick(DELAY_MS);

    cy.get('button:contains("Удалить")').click();

    cy.get(circlesClass)
    .eq(0)
    .should("have.css", "border-color", C_CH)
    .contains("e0");

    cy.get(circlesClass)
    .eq(1)
    .should("have.css", "border-color", C_D)
    .contains("e1");

    cy.get(circlesClass)
    .eq(2)
    .should("have.css", "border-color", C_D)
    .contains("e2");

    cy.tick(DELAY_MS);

    cy.get(circlesClass)
    .eq(0)
    .should("have.css", "border-color", C_CH);

    cy.tick(DELAY_MS);

    cy.get(circlesClass)
    .eq(0)
    .should('have.text', '');
  });

  it("Очистка очереди от элементов", () => {

    cy.clock();
    cy.get("input").type("e0").should("have.value", "e0");
    cy.get('button:contains("Добавить")').click();

    cy.get(circlesClass)
      .eq(0)
      .should("have.css", "border-color", C_CH)
      .contains("e0");

    cy.tick(DELAY_MS);
    
    cy.get("input").type("e1").should("have.value", "e1");
    cy.get('button:contains("Добавить")').click();
    
    cy.get(circlesClass)
    .eq(0)
    .should("have.css", "border-color", C_D)
    .contains("e0");

    cy.get(circlesClass)
    .eq(1)
    .should("have.css", "border-color", C_CH)
    .contains("e1");

    cy.tick(DELAY_MS);
    
    cy.get("input").type("e2").should("have.value", "e2");
    cy.get('button:contains("Добавить")').click();

    cy.get(circlesClass)
    .eq(0)
    .should("have.css", "border-color", C_D)
    .contains("e0");

    cy.get(circlesClass)
    .eq(1)
    .should("have.css", "border-color", C_D)
    .contains("e1");

    cy.get(circlesClass)
    .eq(2)
    .should("have.css", "border-color", C_CH)
    .contains("e2");

    cy.tick(DELAY_MS);

    cy.get('button:contains("Очистить")').click();
    cy.tick(DELAY_MS);

    cy.get(circlesClass)
    .should('have.text', '');
  });

});