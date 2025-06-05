import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { LinkNav } from '../LinkNavbar';

jest.mock('laravel-react-i18n', () => ({
    useLaravelReactI18n: jest.fn(),
}));

describe('LinkNav Component', () => {
    const mockT = jest.fn((key) => key);

    beforeEach(() => {
        useLaravelReactI18n.mockReturnValue({ t: mockT });
        window.location.pathname = '/';
        window.location.hash = '';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders with SSR Link', () => {
        render(<LinkNav icon={<span>Icon</span>} label="home" href="/" ssr={true} />);

        const linkElement = screen.getByRole('link', { name: /home/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/');
        expect(linkElement).toHaveClass('text-blue-500');
    });

    test('renders with non-SSR Link', () => {
        render(<LinkNav icon={<span>Icon</span>} label="about" href="/about" ssr={false} />);

        const linkElement = screen.getByRole('link', { name: /about/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/about');
        expect(linkElement).toHaveClass('text-gray-700');
    });

    test('translates label correctly', () => {
        render(<LinkNav icon={<span>Icon</span>} label="home" href="/" ssr={true} />);

        expect(mockT).toHaveBeenCalledWith('home');
    });

    test('handles active state based on hash', () => {
        act(() => {
            window.location.hash = '#about';
        });

        render(<LinkNav icon={<span>Icon</span>} label="about" href="#about" ssr={true} />);

        const linkElement = screen.getByRole('link', { name: /about/i });
        expect(linkElement).toHaveClass('text-blue-500');
    });
});