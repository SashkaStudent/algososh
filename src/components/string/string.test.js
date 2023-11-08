import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { StringComponent } from './string';
import App from "../app/app";
import { BrowserRouter } from "react-router-dom";

describe('StringComponent', () => {



    it('Четное', async () => {
        render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

        const button = screen.getByTestId('button-submit');
        const input = screen.getByTestId('input-string');

        fireEvent.change(input, { target: { value: 'heello' } });
        fireEvent.click(button);

        await waitFor(() => {
            const circles = screen.getAllByTestId('circle');
            expect(circles[0]).toHaveTextContent('o');
            expect(circles[1]).toHaveTextContent('l');
            expect(circles[2]).toHaveTextContent('l');
            expect(circles[3]).toHaveTextContent('e');
            expect(circles[4]).toHaveTextContent('e');
            expect(circles[5]).toHaveTextContent('h');
        }, { timeout: 4000 })
    });



    it('Нечетное', async () => {
        render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

        const button = screen.getByTestId("button-submit");
        const input = screen.getByTestId("input-string");

        fireEvent.change(input, { target: { value: 'world' } });
        fireEvent.click(button);

        await waitFor(() => {
            const circles = screen.getAllByTestId('circle');

            expect(circles[0]).toHaveTextContent('w');
            expect(circles[1]).toHaveTextContent('o');
            expect(circles[2]).toHaveTextContent('r');
            expect(circles[3]).toHaveTextContent('l');
            expect(circles[4]).toHaveTextContent('d');
        }, { timeout: 4000 })
    });

    it('Один символ', async () => {
        render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

        const button = screen.getByTestId("button-submit");
        const input = screen.getByTestId("input-string");

        fireEvent.change(input, { target: { value: 'h' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByLabelText('circle')).toBeNull();
        }, { timeout: 2000 })

    });

    it('Срабатывает корректно при пустой строке ввода', async () => {
        render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

        const button = screen.getByTestId("button-submit");
        const input = screen.getByTestId("input-string");

        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByLabelText('circle')).toBeNull();
        }, { timeout: 2000 })
    });
});