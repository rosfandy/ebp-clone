import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LinkSidebar } from '../LinkSidebar';

jest.mock('@inertiajs/react', () => ({
    Link: jest.fn(({ children, ...props }) => <a {...props}>{children}</a>),
}));

describe('LinkSidebar Component', () => {
    const mockLink = {
        href: '/about',
        label: 'About',
        icon: <span>Icon</span>,
    };

    test('renders link with correct href and label', () => {
        render(<LinkSidebar link={mockLink} index={0} path="/about" isCollapsed={false} />);

        const linkElement = screen.getByRole('link', { name: /about/i });
        expect(linkElement).toHaveAttribute('href', '/about');
        expect(linkElement).toBeInTheDocument();
    });

    test('applies active class when path matches link href', () => {
        render(<LinkSidebar link={mockLink} index={0} path="/about" isCollapsed={false} />);

        const linkElement = screen.getByRole('link', { name: /about/i });
        expect(linkElement).toHaveClass('text-white');
    });

    test('applies inactive class when path does not match link href', () => {
        render(<LinkSidebar link={mockLink} index={0} path="/home" isCollapsed={false} />);

        const linkElement = screen.getByRole('link', { name: /about/i });
        expect(linkElement).toHaveClass('text-[#687b95]');
    });

    test('shows label when not collapsed', () => {
        render(<LinkSidebar link={mockLink} index={0} path="/about" isCollapsed={false} />);

        const labelElement = screen.getByText(/about/i);
        expect(labelElement).toBeVisible();
    });

    test('shows tooltip when collapsed and hovered', () => {
        render(<LinkSidebar link={mockLink} index={0} path="/about" isCollapsed={true} />);

        const linkElement = screen.getByRole('link', { name: /about/i });
        expect(linkElement).toBeInTheDocument();

        fireEvent.mouseOver(linkElement);

        const tooltipElement = screen.getByLabelText(/about/i);
        expect(tooltipElement).toBeVisible();
    });


}); 