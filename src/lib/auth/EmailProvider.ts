import MagicEmailProvider from 'next-auth/providers/email'
import nodemailer from 'nodemailer'

async function sendVerificationRequest({
  identifier: email,
  url,
}: // token,
// provider,
{
  identifier: string
  url: string
  // token: string
  // provider: any
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT as unknown as number,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: process.env.NODE_ENV === 'production' ? true : false,
    // tls: {
    //   ciphers: 'SSLv3',
    // },
  })

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        console.log('Server is ready to take our messages')
        resolve(success)
      }
    })
  })

  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Welcome!</title>
      <style>
        /* Inline styles for email clients that don't support embedded CSS */
        @media only screen and (max-width: 600px) {
          /* Responsive styles for small screens */
          .container {
            width: 100% !important;
            padding: 0 20px !important;
          }
        }
        .welcome-text {
          font-size: 20px;
          font-weight: 500;
          text-decoration: none;
          color: currentColor;
        }
      </style>
    </head>
    <body>
      <a href="${url}" class="welcome-text">
        <span> Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}</span>
      </a>
    </body>
  </html>  
`

  const sendMessage = async () => {
    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Confirm Your Email Address',
      html,
    })
  }

  await sendMessage()
}

export const EmailProvider = () => {
  return MagicEmailProvider({
    from: process.env.EMAIL_FROM,
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT as unknown as number,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },

    async generateVerificationToken() {
      return `${Math.random() * 1000}`
    },
    sendVerificationRequest,
  })
}
