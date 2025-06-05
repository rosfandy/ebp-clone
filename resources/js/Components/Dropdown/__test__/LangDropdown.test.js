import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { LangDropdown } from '../LangDropdown';

jest.mock('laravel-react-i18n', () => ({
    useLaravelReactI18n: jest.fn(),
}));

describe('LangDropdown Component', () => {
    const setLocaleMock = jest.fn();
    beforeEach(() => {
        useLaravelReactI18n.mockReturnValue({ setLocale: setLocaleMock });
    });

    it('renders the current language', () => {
        render(<LangDropdown currentLang="en" />);
        expect(screen.getByText(/English/i)).toBeInTheDocument();
    });

    it('toggles the dropdown when button is clicked', async () => {
        render(<LangDropdown currentLang="en" />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(screen.getByText(/En - English/i)).toBeInTheDocument();
        expect(screen.getByText(/Id - Bahasa/i)).toBeInTheDocument();

        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByText(/En - English/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/Id - Bahasa/i)).not.toBeInTheDocument();
        });
    });

    it('calls setLocale with "en" when English is selected', () => {
        render(<LangDropdown currentLang="en" />);

        fireEvent.click(screen.getByRole('button'));

        fireEvent.click(screen.getByText(/En - English/i));

        expect(setLocaleMock).toHaveBeenCalledWith('en');
    });

    it('calls setLocale with "id" when Bahasa is selected', () => {
        render(<LangDropdown currentLang="id" />);

        fireEvent.click(screen.getByRole('button'));

        fireEvent.click(screen.getByText(/Id - Bahasa/i));

        expect(setLocaleMock).toHaveBeenCalledWith('id');
    });
});