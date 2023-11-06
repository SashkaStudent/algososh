import { host } from "../utils/constants";

describe("Работоспособность приложения", () => {
    it("Работает", () => {
        cy.visit(`${host}`);
    });
});