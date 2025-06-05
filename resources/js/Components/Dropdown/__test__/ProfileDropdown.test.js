import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileDropdown } from '../ProfileDropdown';

const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    picture: 'https://example.com/profile.jpg',
};

describe('ProfileDropdown Component', () => {
    it('renders user picture, name, and email', () => {
        render(<ProfileDropdown user={mockUser} />);

        const userPicture = screen.getByAltText('');
        expect(userPicture).toBeInTheDocument();
        expect(userPicture).toHaveAttribute('src', mockUser.picture);

        fireEvent.click(userPicture);

        expect(screen.getByText(mockUser.name)).toBeInTheDocument();
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });

    it('toggles the dropdown when the user picture is clicked', async () => {
        render(<ProfileDropdown user={mockUser} />);

        const userPicture = screen.getByAltText('');
        fireEvent.click(userPicture);

        expect(screen.getByText(mockUser.name)).toBeInTheDocument();
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();

        fireEvent.click(userPicture);

        await waitFor(() => {
            expect(screen.queryByText(mockUser.name)).not.toBeInTheDocument();
            expect(screen.queryByText(mockUser.email)).not.toBeInTheDocument();
        });
    });

});