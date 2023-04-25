import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Reset from './Reset';

describe('Reset should render without crashing', () => {
    it('should render Reset by default', () => {
        const test = jest.fn()
        render(<Reset setTicket={test} />);
        expect(screen.getByText("Reset")).toBeInTheDocument();
    });
    it('clicking reset button call props method', () => {
        const test = jest.fn()
        render(<Reset setTicket={test} />);
        fireEvent.click(screen.getByText("Reset"));
        expect(test).toBeCalledTimes(1);
    });
});