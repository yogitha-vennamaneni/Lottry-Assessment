import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App should render without crashing', () => {
    it('should render App by default', () => {
        render(<App />);

        expect(screen.getByText(/Helloworld React!!!!/)).toBeInTheDocument();
    });
});