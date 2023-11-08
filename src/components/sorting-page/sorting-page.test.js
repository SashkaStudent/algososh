import { render, screen } from '@testing-library/react';
import { SortingPage } from './sorting-page';
import { BrowserRouter } from "react-router-dom";

describe('SortingPage', () => {
    test('Отрисовка массива', () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);
        expect(screen.getByTestId('sorting-page')).toBeInTheDocument();
    });

    it('Пустой массив', () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);
        const container = screen.getByTestId('columns');
        expect(container).not.toBeEmptyDOMElement()

    });

    it('С несколькими эллементами', () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);
        screen.getByTestId('make-new-array-button').click();
        const arrayElement = screen.getAllByTestId('column');
        expect(arrayElement).not.toHaveLength(0);
    });

    it('По возрастанию', () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);
        screen.getByTestId('make-new-array-button').click();
        screen.getByTestId('asc-button').click();
        const arrayElement = screen.getAllByTestId('column');
        const values = arrayElement.map(element => parseInt(element.textContent));
        const sortedValues = [...values].sort((a, b) => a - b);
        expect(sortedValues).toEqual(sortedValues);
    });

    it('По убыванию', () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);
        screen.getByTestId('make-new-array-button').click();
        screen.getByTestId('desc-button').click();
        const arrayElement = screen.getAllByTestId('column');
        const values = arrayElement.map(element => parseInt(element.textContent));
        const sortedValues = [...values].sort((a, b) => b - a);
        expect(sortedValues).toEqual(sortedValues);
    });

});