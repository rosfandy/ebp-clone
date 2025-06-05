import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
    it('renders with the correct label', () => {
        render(<Button label="Click Me" onClick={() => { }} />);
        expect(screen.getByText(/Click Me/i)).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button label="Click Me" onClick={handleClick} />);
        fireEvent.click(screen.getByText(/Click Me/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});