import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DrawBall from './DrawBalls';

describe('Draw Balls should render without crashing', () => {
    it('should render DrawBalls by default', () => {
        render(<DrawBall />);
        expect(screen.getByText("Draw Balls")).toBeInTheDocument();
    });
});