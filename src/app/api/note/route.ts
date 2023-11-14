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

export async function PUT(req: NextRequest) {
  const data: NoteItemPUT = await req.json();

  console.debug('Update note');
  const newNote = await prisma.note.update({ where: { id: data.id }, data });
  console.debug('Update note successful', data);

  return NextResponse.json(newNote);
}

export async function DELETE(req: NextRequest) {
  const data: { id: number } = await req.json();
  console.debug('Deleting Note Id:', data.id);
  await prisma.note.delete({ where: { id: data.id } });
  console.debug('Delete Note successful');

  return NextResponse.json(data);
}
