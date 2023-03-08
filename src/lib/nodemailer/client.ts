import { createTransport } from 'nodemailer'
import smtpConfig from './config'

export const sendEmail = async (values: any) => {
  const transporter = createTransport(smtpConfig)

  const mailData = {
    from: process.env.EMAIL_FROM,
    to: ['test@test.com'],
    subject: `A new email`,
    html: `${Object.entries(values).map(
      ([key, value]) => `<p><strong>${key}:</strong> ${value}</p>\n`
    )}`,
  }

  return transporter.sendMail(mailData)
}
