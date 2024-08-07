import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { vi } from 'vitest';
import ContactPage from '../page';
import type { Contact } from '@prisma/client';

vi.mock('@/lib/services/getContact', () => {
  return {
    getContact: async (id: string) => {
      return {
        avatar: 'https://example.com/avatar.jpg',
        email: 'test@test.com',
        favorite: false,
        first: 'Test',
        github: 'testuser',
        id,
        last: 'User',
        notes: 'Test notes',
        position: 'Software Developer',
      } as Contact;
    },
  };
});

describe('ContactPage', () => {
  it('render the correct contact info', async () => {
    render(
      <Suspense>
        <ContactPage params={{ contactId: '0' }} />
      </Suspense>,
    );

    expect(await screen.findByRole('heading')).toHaveTextContent('Test User');
    expect(await screen.findByRole('button', { name: 'Add to favorites' })).toHaveTextContent('☆');
    expect(await screen.findByText('Software Developer')).toBeInTheDocument;
    expect(await screen.findByText('test@test.com')).toBeInTheDocument();
    expect(await screen.findByText('testuser')).toBeInTheDocument();
    expect(await screen.findByText('Test notes')).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: 'Edit' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
