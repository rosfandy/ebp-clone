import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Sidebar } from '../Sidebar';

jest.mock('laravel-react-i18n', () => ({
    useLaravelReactI18n: jest.fn(),
}));

jest.mock('../../Navigation/Link/LinkSidebar', () => ({
    LinkSidebar: jest.fn(({ link }) => <div role="link">{link.label}</div>),
}));

describe('Sidebar Component', () => {
    const mockSetIsCollapsed = jest.fn();

    beforeEach(() => {
        useLaravelReactI18n.mockReturnValue({ t: (key) => key });
    });

    test('renders links for admin user', () => {
        const user = { role: 'admin' };
        render(<Sidebar user={user} isCollapsed={false} setIsCollapsed={mockSetIsCollapsed} />);

        expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Verification/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Member/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Academic/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Letter/i })).toBeInTheDocument();
    });

    test('renders links for staff user', () => {
        const user = { role: 'staff' };
        render(<Sidebar user={user} isCollapsed={false} setIsCollapsed={mockSetIsCollapsed} />);

        expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Verification/i })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /Member/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /Academic/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /Letter/i })).not.toBeInTheDocument();
    });

    test('toggles collapse state when menu icon is clicked', () => {
        const user = { role: 'admin' };
        const { container } = render(<Sidebar user={user} isCollapsed={false} setIsCollapsed={mockSetIsCollapsed} />);

        const menuIcon = container.querySelector('#menu-icon');
        fireEvent.click(menuIcon);

        expect(mockSetIsCollapsed).toHaveBeenCalledWith(true);
    });

});