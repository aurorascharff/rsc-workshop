import { NextResponse } from 'next/server';
import { prisma } from '@/db';

export async function GET() {
  console.log('API GET /api/contacts');
  const contacts = await prisma.contact.findMany({
    orderBy: [{ first: 'asc' }, { last: 'asc' }],
  });

  return NextResponse.json(contacts, { status: 200 });
}
