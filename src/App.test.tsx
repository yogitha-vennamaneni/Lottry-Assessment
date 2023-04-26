import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App should render without crashing', () => {
    it('should render App by default', () => {
        render(<App />);

        expect(screen.getByText("Reset")).toBeInTheDocument();
    });
});