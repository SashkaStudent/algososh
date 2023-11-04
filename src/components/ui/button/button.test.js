import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";


describe('Тест компонента Button', () => {
    it('Кнопка без текста', () => {
        const buttonWithoutText = render(<Button/>);
        expect(buttonWithoutText).toMatchSnapshot();
    })
})