import nodemailer from 'nodemailer';

import type Mail from 'nodemailer/lib/mailer';

function getTransporter() {
  console.debug('Email Server', process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
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

  return await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(
      {
        ...payload,
        from: `"Note Reminder" <${process.env.EMAIL_USER}>`, // sender address
      },
      (err, info) => {
        if (err) {
          console.error('Send Email Error:', err);
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
}
