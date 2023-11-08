import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";


describe('Тест компонента Button', () => {
    it('Кнопка без текста', () => {
        const buttonNotText = render(<Button/>);
        expect(buttonNotText).toMatchSnapshot();
    })
    it("Кнопка с текстом", () => {
        const buttonWithText = render(<Button text = "text" />);
        expect(buttonWithText).toMatchSnapshot();
    });

    it("Заблокированная кнопка", () => {
        const buttonDisabled = render(<Button disabled = { true } />);
        expect(buttonDisabled).toMatchSnapshot();
    });

    it("Индикатор загрузки на кнопке", () => {
        const buttonLoader = render(<Button isLoader = { true } />);
        expect(buttonLoader).toMatchSnapshot();
    });

    it("Колбек на кнопку", () => {
        const onClick = jest.fn();
        render(<Button onClick = { onClick } text = "test" />);
        fireEvent.click(screen.getByText("test"));
        expect(onClick).toHaveBeenCalled();
    });
})