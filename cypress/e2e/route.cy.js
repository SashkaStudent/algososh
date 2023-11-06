import { host } from "../utils/constants";

const promt = "Вдохновлено школами, в которых не учили алгоритмам";
const returnButtonHref = `a[href*="/"]`;
describe("Тестирование переходов по страницам", () => {
    beforeEach(() => {
        cy.visit(`${host}`);
    });

    it("Главная страница открывается по-умолчанию", () => {
        cy.get("div > a").should("be.visible").and("have.length", 6);
        cy.contains(promt);
    });

    it("Переход на алгоритм Строка по нажатию ссылки recursion", () => {
        cy.get(`a[href*="recursion"]`).click();
        cy.contains("Строка");
        cy.get(returnButtonHref).click();
        cy.contains(promt);
    });

    it("Переход на алгоритм Последовательность Фибоначчи по нажатию ссылки fibonacci", () => {
        cy.get(`a[href*="fibonacci"]`).click();
        cy.contains("Последовательность Фибоначчи");
        cy.get(returnButtonHref).click();
        cy.contains(promt);
    });

    it("Переход на алгоритм Сортировка по нажатию ссылки sorting", () => {
        cy.get(`a[href*="sorting"]`).click();
        cy.contains("Сортировка");
        cy.get(returnButtonHref).click();
        cy.contains(promt);
    });

    it("Переход на алгоритм Стек по нажатию ссылки stack", () => {
        cy.get(`a[href*="stack"]`).click();
        cy.contains("Стек");
        cy.get(returnButtonHref).click();
        cy.contains(promt);
    });

    it("Переход на алгоритм Очередь по нажатию ссылки queue", () => {
        cy.get(`a[href*="queue"]`).click();
        cy.contains("Очередь");
        cy.get(returnButtonHref).click();
        cy.contains(promt);
    });

    it("Переход на алгоритм Список по нажатию ссылки list", () => {
        cy.get(`a[href*="list"]`).click();
        cy.contains("Связный список");
        cy.get(returnButtonHref).click();
        cy.contains(promt);
    });
});