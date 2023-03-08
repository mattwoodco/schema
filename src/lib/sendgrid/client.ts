import { Client as Sendgrid } from '@sendgrid/client'

declare global {
  var sendgrid: Sendgrid | undefined
}

export const sendgrid =
  global.sendgrid ||
  (() => {
    const client = new Sendgrid()
    client.setApiKey(process.env.SENDGRID_API_KEY as string)
    return client
  })()

if (process.env.NODE_ENV !== 'production') global.sendgrid = sendgrid
