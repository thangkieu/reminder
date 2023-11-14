import { sendEmail } from "@/utils/email";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { kv } from "@vercel/kv";

function getEmailContent() {
  return "Hello world?";
}

const SUBJECT = "Your Daily Highlighting";

export async function GET(req: NextRequest) {
  console.log("Running CronJob...", headers().get("Authorization"));

  if (headers().get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    console.error(
      "CRON_SECRET is missing, CronJob stopped",
      process.env.CRON_SECRET
    );
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const mailContent = getEmailContent();
  const toemails = await kv.lrange("to_emails", 0, -1);

  console.log("Recipients:", toemails);

  for (let i = 0; i < toemails.length; i++) {
    const to = toemails[i];
    console.log(`Sending Email "${SUBJECT}" to ${to} at ${new Date()}`);

    sendEmail({
      to,
      subject: SUBJECT,
      text: mailContent,
      html: mailContent,
    }).then((info) => console.log("Message sent: %s", info.messageId));
  }

  return NextResponse.json({ message: "Sending..." });
}
