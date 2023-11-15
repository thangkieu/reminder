import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import type Mail from 'nodemailer/lib/mailer';
function getTransporter() {
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

  // console.debug('Start verifying transporter');
  // await new Promise((resolve, reject) => {
  //   // verify connection configuration
  //   transporter.verify(function (error: any, success: any) {
  //     console.debug('Verify Transporter failed', error, success);
  //     if (success) resolve(success);

  //     reject(error);
  //   });
  // });
  // console.debug('Verifying transporter successful');

  // send mail with defined transport object
  console.debug('Start Sending Email...');
  return await new Promise<SMTPTransport.SentMessageInfo>((resolve, reject) => {
    // send mail
    transporter.sendMail(
      {
        ...payload,
        from: `"Jay _" <${process.env.EMAIL_USER}>`, // sender address
      },
      (err, info) => {
        console.debug('Send Email Done:', info, err);

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
