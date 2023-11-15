import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import type Mail from 'nodemailer/lib/mailer';
function getTransporter() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      // type: 'OAuth2',
      // user: 'note-reminder-account-2@note-reminder-405206.iam.gserviceaccount.com',
      // // pass: process.env.EMAIL_PASSWORD,
      // // accessToken: 'e248db99eb5d44badbf78114f35472fbf8478b1d',
      // serviceClient: '100228715139513133441',
      // privateKey:
      //   '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuvhfK8SVDkxYy\nhVkTtwYrsDpUlmXuceZuJsIWLo+1X1sasNefdO5wq1uC71S72Fr7u4sQOcrXv1Sp\ntBeYiq9MYDjJBIWyQALs3JH/jOobBvTPDy8EunerczWtHUxbVjmN9tpy7nzvNAVz\nDJJFzLbjY2YYvtF2gRGWcswjjsRkmLFC+zt+7rIDDxzRyFZxu0otDCdThqNNXc2q\nc/8aoVB/zZ1f5S13Y3cgBNp9aYi/jPLuWUT04fOlFrAZyuMO6yyk1r0J4SqbaEhW\nEiVgHPbyJh9hSz5c65GR5xrVjybPzzZDp+102yyn1ftyMFccSy/WdlZeQMTKT/CE\nMSd3KDb/AgMBAAECggEARJ+AZoFnGe+EcxitD7H7qWKOtbNOmmJ+lNmBtQZaB2dI\nNuYl94gLL5IL4RKuGwrvSBaxmRCpGSsZS3/fGFe2We8bvc2Z15ON0okYiNxE/5Iu\nx7X1yAyWfG1FMhPkbaYh+h9sUGBaDfJHBZR1SRYI6KmbabJePgSX7JZulrQ1ai9p\n6XOAb97kfOncT/2XkZ1MY0jc37yjmtLYnclP5mVmLB2fFfWeCwHlz/xPzP7x0hQ2\nXWjekwT+8pZrzxUI/IR308g3WTTCxYULnVKQzsQ+OaN12+1+sGcZXg8WZ1xql7QV\nxXUG7ZozcfeW4/vkfJj4M7rHHb81DZbARlD+jQyOkQKBgQDoZuAgKpR1beCaHmvW\nVNiDTiK28yPHeuR9TyeVAh9Tqr4j+8O65hykjXSgliFQI2GQoVWSAkceQ1/y9wFM\nDzrqHdyrS6f3y+14AYj9RUxafQGi9FSiIHJ0JWHIVysWhPQEFf3CfOv/clhHjI8E\n3wHv/11JFIiBTftwltgTUa7fGQKBgQDAfGdmS2rBMeteG6Je9UyM/qEvHqcetadS\nwej6zeJWGXJQL5MrPjEe2HK558WkSySLz/29thAn7x+VcXpX3v+4n2zxeLbdvi8j\nLuKtISkRX4Ls+C9KcejFC5hOV2lJQaD7mFX8CItKaTbA+zJo+5fXPjTOD6MrI1QN\nsBVIaAHB1wKBgEoU+R7n09k3BGC8j82L0FTS5HgDO4WMJCfZwplaStgl1mSsDbGX\nRswhl2rVUJs2HBS5iQh5F2iLO5u8pzoypKoaiMxF2q4/4FvfyWZK39L8hDgIwK3J\nwBJMFEaDmuWbzhk7VV/Y6HXOYlu0b6ay2/BAK+Fu3TCyxhMW0pwd7quJAoGAJyCi\nvC6UctU87RJc/USL3RVdmoB2pE10x+PXAjSbz7i4fghNuDqaLZT+LUAp8u27bhhH\nkirSOevn1a8NmZMhFFyD/sn1Ejo4xsQfG+ZjvL5XlOgWZOGm2Xcz7KjkJBoNKVec\nEvGBrwyYLr5hTunlwcFJZqHTH0+9JFMo4GEUCl0CgYEAkswfd0Ad9OBzGz04yuLP\nuaztAOa0q+hlOmS/OyiPJFbHMii79dLY41PYPgkBLNKa9U9PkxnEgUok9UmqINWs\nTj6h7ZqSRgyd3gNp1SRQRN9BuHqK3kSvywEiv97Xd2e5brLWOtf/izm9sAUIJGlP\nDhuPNfMpn1zcNek1L2uazJQ=\n-----END PRIVATE KEY-----\n',
      // clientSecret: 'e248db99eb5d44badbf78114f35472fbf8478b1d',
      // accessUrl: 'https://oauth2.googleapis.com/token',
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
        from: 'Jay _ <jay.space91@gmail.com>', // sender address
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
