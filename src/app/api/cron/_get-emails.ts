import MarkdownId from 'markdown-it';

import { prisma } from '@/utils/prisma';
import { generateRandom } from '@/utils/utils';

const md = new MarkdownId({ breaks: true, typographer: true });
const NO_OF_NOTE = process.env.NO_OF_NOTE ? parseInt(process.env.NO_OF_NOTE, 10) : 5;

export async function getEmailContent() {
  const totalRecord = await prisma.note.findMany();
  const noOfNotes = Math.min(totalRecord.length, NO_OF_NOTE);

  const notes: number[] = [];
  let emailStr = '## Your Daily Reminder\n';

  while (notes.length < noOfNotes) {
    const index = generateRandom(0, totalRecord.length);
    if (notes.includes(index)) continue;

    notes.push(index);
    const noteItem = totalRecord.at(index);
    emailStr = `
${emailStr}

### ${noteItem?.title}

${noteItem?.content}

--------------------`;
  }
  console.log('emailStr', emailStr);

  return `<div style="border-radius:10px;padding: 0 16px 10px;border: 1px solid #dddddd;max-width: 600px;margin: auto;">${md.render(
    emailStr
  )}<div style="text-align: center; color: #949494"><em>Brought to you by Note Reminder</em></div></div>`;
}
