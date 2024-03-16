import * as nodemailer from 'nodemailer';
import {SendMailOptions, Transporter} from 'nodemailer';





let baseurl = 'https://storage.cloud.google.com/tour2wellness_bucket/';
export interface SendMailOptionsWithBody extends SendMailOptions {
  bodyText?: string;
}


export async function sendEmail(email: string, subject: string, text: string, attachment?: string, attachmentName?: string, fileExtension?: string, options?: SendMailOptionsWithBody) {
  try {

    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions: SendMailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      attachments: [],
      html: options?.bodyText || '',

    };
    if (attachment && attachmentName) {

      const attachmentObject = {
        filename: attachmentName,
        content: attachment,
        encoding: 'base64',
      };

      mailOptions.attachments = [attachmentObject];
    }
    if (options && options.bodyText) {
      mailOptions.text += `\n\n${options.bodyText}`;
    }

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.log("Email not sent to:", email);
    console.error(error.message);
  }
}

// export async function sendThankYouEmail(email: string, subject: string, text: string): Promise<void> {
//   try {
//     const transporter: Transporter = nodemailer.createTransport({
//       host: process.env.HOST,
//       service: process.env.SERVICE,
//       port: Number(process.env.EMAIL_PORT),
//       secure: Boolean(process.env.SECURE),
//       auth: {
//         user: process.env.USER,
//         pass: process.env.PASS,
//       },
//     });

//     const thankYouMailOptions: SendMailOptions = {
//       from: process.env.USER,
//       to: email,
//       subject: subject,
//       text: text,
//     };

//     await transporter.sendMail(thankYouMailOptions);

//     console.log("Thank-you Email sent successfully to:", email);
//   } catch (error) {
//     console.log("Thank-you Email not sent to:", email);
//     console.error(error.message);
//   }
// }
