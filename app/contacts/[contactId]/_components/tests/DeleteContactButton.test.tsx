import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { vi } from 'vitest';
import DeleteContactButton from '../DeleteContactButton';

const mockDeleteContact = vi.fn();

vi.mock('@/data/actions/deleteContact', () => {
  return {
    deleteContact: async (contactId: string) => {
      return mockDeleteContact(contactId);
    },
  };
});

describe('DeleteContactButton', () => {
  it('renders a modal when clicked and calls the update function if confirm is true', async () => {
    render(<DeleteContactButton contactId="0" />);

    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toHaveTextContent('Delete');
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(confirmSpy).toHaveBeenCalled();
    expect(mockDeleteContact).toHaveBeenCalledWith('0');
  });

  it('renders a modal when clicked and does not call the update function if confirm is false', async () => {
    render(<DeleteContactButton contactId="0" />);

    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toHaveTextContent('Delete');
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(confirmSpy).toHaveBeenCalled();
    expect(mockDeleteContact).not.toHaveBeenCalled();
  });
});
