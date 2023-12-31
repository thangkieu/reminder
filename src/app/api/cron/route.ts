import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { sendEmail } from '@/utils/email';
import { prisma } from '@/utils/prisma';

import { getEmailContent } from './_get-emails';

const SUBJECT = 'Your Daily Reminder';

export async function GET(req: NextRequest) {
  console.log('Running CronJob...', headers().get('Authorization'));

  if (headers().get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    console.error('CRON_SECRET is missing, CronJob stopped', process.env.CRON_SECRET);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const mailContent = await getEmailContent();
  const toemails = await prisma.recipient.findMany();

  console.log('Recipients:', toemails);

  for (const element of toemails) {
    const to = element.email;

    console.log(`Sending Email "${SUBJECT}" to ${to} at ${new Date()}`);

    sendEmail({
      to,
      subject: SUBJECT,
      text: mailContent,
      html: mailContent,
    })
      .then((info) => console.log('Message sent: %s', info.messageId))
      .catch((err) => console.error('Send Email failed', err));
  }

  return NextResponse.json({ message: 'Sending...' });
}
