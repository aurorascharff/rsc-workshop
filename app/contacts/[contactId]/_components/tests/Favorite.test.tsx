import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { vi } from 'vitest';
import Favorite from '../Favorite';
import type { Contact } from '@prisma/client';

const mockFavoriteContact = vi.fn();

vi.mock('@/lib/actions/favoriteContact', () => {
  return {
    favoriteContact: async (contactId: string, isFavorite: boolean) => {
      return mockFavoriteContact(contactId, isFavorite);
    },
  };
});

describe('Favorite', () => {
  it('renders as non-starred when contact favorite is false', () => {
    render(<Favorite contact={{ favorite: false, id: '0' } as Contact} />);

    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toHaveTextContent('☆');
    expect(favoriteButton).toHaveAccessibleName('Add to favorites');
  });

  it('renders as starred when contact favorite is true', () => {
    render(<Favorite contact={{ favorite: true, id: '0' } as Contact} />);

    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toHaveTextContent('★');
    expect(favoriteButton).toHaveAccessibleName('Remove from favorites');
  });

  it('updates when button is clicked and calls the correct function', async () => {
    render(<Favorite contact={{ favorite: false, id: '0' } as Contact} />);

    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toHaveTextContent('☆');

    await act(async () => {
      fireEvent.click(favoriteButton);
    });
    expect(favoriteButton).toHaveTextContent('☆');

    // When we don´t await the event, we assert the UI before the optimistic update has "rolled back" to the original state (because the server state did not update).
    // act(() => {
    //   fireEvent.click(favoriteButton);
    // });
    // expect(favoriteButton).toHaveTextContent('★');

    expect(mockFavoriteContact).toHaveBeenCalledWith('0', false);
  });
});
