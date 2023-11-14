import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/utils/prisma';

export async function GET() {}

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.debug('Insert new note');
  const newNote = await prisma.note.create({ data });
  console.debug('Insert new note successful', data);

  return NextResponse.json(newNote);
}
