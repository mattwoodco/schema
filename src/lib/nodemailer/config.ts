import { TransportOptions } from "nodemailer";

const smtpConfig = {
  port: process.env.EMAIL_SERVER_PORT,
  host: process.env.EMAIL_SERVER_HOST,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
} as TransportOptions;

export default smtpConfig;
