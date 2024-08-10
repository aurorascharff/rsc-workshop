import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';
import { prisma } from '@/db';
import type { NextRequest } from 'next/server';

type Params = {
  params: {
    contactId: string;
  };
};

export async function GET(_request: NextRequest, { params }: Params) {
  console.log('API GET /api/contacts/[contactId]');
  const contact = await prisma.contact.findUnique({
    where: {
      id: params.contactId,
    },
  });
  if (!contact) {
    notFound();
  }

  return NextResponse.json(contact, { status: 200 });
}
