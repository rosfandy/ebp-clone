import React from 'react';
import { render, screen } from '@testing-library/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { HomeFooter } from '../HomeFooter';

jest.mock('laravel-react-i18n', () => ({
    useLaravelReactI18n: jest.fn(),
}));

describe('HomeFooter Component', () => {
    beforeEach(() => {
        useLaravelReactI18n.mockReturnValue({
            t: (key) => key,
        });
    });

    it('renders the footer with navigation links', () => {
        render(<HomeFooter />);

        expect(screen.getByText(/Copyright ©/)).toBeInTheDocument();
        expect(screen.getByText(/Home/)).toBeInTheDocument();
        expect(screen.getByText(/Services/)).toBeInTheDocument();
    });

    it('renders social media icons', () => {
        render(<HomeFooter />);

        expect(screen.getByRole('link', { name: /youtube/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
    });
});