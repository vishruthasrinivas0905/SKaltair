import nodemailer from 'nodemailer';

let transporter;
function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return null;
  if (!transporter) transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
  return transporter;
}
export async function notifySubmission({ subject, text }) {
  const mailer = getTransporter();
  if (!mailer || !process.env.SUBMISSION_NOTIFICATION_EMAIL) return;
  await mailer.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: process.env.SUBMISSION_NOTIFICATION_EMAIL, subject, text });
}
