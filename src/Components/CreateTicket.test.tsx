import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateTicket from './CreateTicket';

describe('Create Ticket should render without crashing', () => {
    it('should render CreateTicket by default', () => {
        const test = jest.fn();
        let ticket: never[] =[];
        render(<CreateTicket ticket={ticket} updateTicket={test} />);
        expect(screen.getByText("Create a Ticket")).toBeInTheDocument();
    });
    it('clicking create button call props method', () => {
        const test = jest.fn();        
        let ticket: never[] =[];
        render(<CreateTicket ticket={ticket} updateTicket={test} />);
        fireEvent.click(screen.getByText("Create a Ticket"));
        expect(test).toBeCalledTimes(1);
    });
});