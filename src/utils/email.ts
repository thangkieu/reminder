import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

function getTransporter() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter;
}

export async function sendEmail(payload: Mail.Options) {
  const transporter = getTransporter();

  // send mail with defined transport object
  const info = await transporter.sendMail({
    ...payload,
    from: '"Email Reminder 👻" <foo@example.com>', // sender address
  });

  console.log("Message sent: %s", info.messageId);
}
