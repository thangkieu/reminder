import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/utils/prisma';

export async function GET() {}

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.debug('Insert new recipient');
  const insertedData = await prisma.recipient.create({ data });
  console.debug('Insert new recipient successful', data);

  return NextResponse.json(insertedData);
}
