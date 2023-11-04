import { host } from "../utils/constants";

describe("Тестирование работоспособности приложения", () => {
    it("Приложение работает", () => {
        cy.visit(`${host}`);
    });
});