import { NextResponse } from 'next/server';

import { prisma } from '@/utils/prisma';

export async function GET() {
  const notes = await prisma.note.findMany();

  return NextResponse.json(notes);
}
