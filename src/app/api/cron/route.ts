import { sendEmail } from "@/utils/email";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

function getEmailContent() {
  return "Hello world?";
}

export async function GET(req: NextRequest) {
  if (headers().get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const mailContent = getEmailContent();

  await sendEmail({
    to: "kqthang1505@gmail.com",
    subject: "Your Daily Highlighting",
    text: mailContent,
    html: mailContent,
  });

  return NextResponse.json({ message: "Sent" });
}
