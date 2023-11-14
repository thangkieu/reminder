import { NextResponse } from 'next/server';

import { prisma } from '@/utils/prisma';

export async function GET() {
  const data = await prisma.recipient.findMany();
  return NextResponse.json(data);
}
