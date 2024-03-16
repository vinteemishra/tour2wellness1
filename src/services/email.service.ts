// src/services/email.service.ts

import {UserSignup} from '../models';

export async function sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
  // Implement email sending logic using Nodemailer, SendGrid, etc.
  // Example using Nodemailer:

  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: http://your-app.com/verify-email?token=${verificationToken}`,
  };

  await transporter.sendMail(mailOptions);
}
