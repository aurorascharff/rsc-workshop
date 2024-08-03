import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import { vi } from 'vitest';
import DeleteContactButton from '../DeleteContactButton';

const mockDeleteContact = vi.fn();

vi.stubGlobal('confirm', vi.fn());

vi.mock('@/lib/actions/deleteContact', () => {
  return {
    deleteContact: async (contactId: string) => {
      return mockDeleteContact(contactId);
    },
  };
});

beforeEach(() => {
  vi.resetAllMocks();
});

describe('DeleteContactButton', () => {
  it('renders a modal when clicked and calls the update function if confirm is true', () => {
    render(<DeleteContactButton contactId="0" />);

    (window.confirm as jest.Mock).mockImplementation(() => {
      return true;
    });

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toHaveTextContent('Delete');
    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteContact).toHaveBeenCalledWith('0');
  });

  it('renders a modal when clicked and does not call the update function if confirm is false', () => {
    render(<DeleteContactButton contactId="0" />);

    (window.confirm as jest.Mock).mockImplementation(() => {
      return false;
    });

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toHaveTextContent('Delete');
    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteContact).not.toHaveBeenCalled();
  });
});
