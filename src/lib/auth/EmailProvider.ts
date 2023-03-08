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
  })

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Confirm Your Email Address</title>
    <style>
      /* Inline styles for email clients that don't support embedded CSS */
      @media only screen and (max-width: 600px) {
        /* Responsive styles for small screens */
        .container {
          width: 100% !important;
          padding: 0 20px !important;
        }
      }
    </style>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.4/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body class="bg-gray-900 font-mono">
    <div class="max-w-2xl mx-auto  rounded border-4 border-gray-800 p-6">
      <div class="text-center">
        <a href="https://mattwood.co?ref=next-auth-email">
          
        </a>
      </div>
      <div class="px-4 sm:px-6 mt-6">
        <h1 class="text-4xl mb-4">
          Confirm Your Email Address
        </h1>
        <p class="text-gray-600 text-xl mb-4">Hi there,</p>
        <p class="text-gray-400 text-lg mb-4">
          We need to confirm your email address to activate your Example
          account. To do this, please click the button below:
        </p>
      </div>
      <div class="mt-6 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <div class="flex justify-center">
          <a
            href="${url}"
            class="w-full flex items-center justify-center px-4 py-2 border border-transparent  rounded shadow-sm text-lg bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 sm:col-start-2 sm:text-base"
          >
            Confirm Email Address
          </a>
        </div>
        <div class="mt-3 sm:mt-0 sm:col-start-1">
          <p class="text-base font-medium text-gray-400">
            If you did not create an account on Example, please ignore this
            email.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`

  await transporter.sendMail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Confirm Your Email Address',
    html,
  })
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
