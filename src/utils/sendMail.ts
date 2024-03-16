import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
require('dotenv').config();

// dotenv.config();

export async function sendEmail(email: string, subject: string, text: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    console.log("trantorter",transporter);

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.log("Email not sent to:", email);
    console.error(error.message);
  }
}
