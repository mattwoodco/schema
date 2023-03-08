import { sendgrid } from '@/lib/sendgrid/client'
import { Contact, HttpMethod } from '@/types/sendgrid'

export async function POST(request: Request) {
  const { email } = await request.json()
  if (!email) {
    return new Response('email is required', {
      status: 400,
    })
  }

  try {
    const contact: Contact = { email }

    const data = {
      contacts: [contact],
      list_ids: [process.env.SENDGRID_LIST_ID],
    }

    const request = {
      url: `/v3/marketing/contacts`,
      method: 'PUT' as HttpMethod,
      body: data,
    }

    const sendgridResponse: any = await sendgrid.request(request)
    const [response] = sendgridResponse

    if (!response) {
      return new Response('No response', {
        status: 500,
      })
    }

    return new Response(response.body, {
      status: response.statusCode,
    })
  } catch (error) {
    return new Response('something went wrong at the end', {
      status: 500,
    })
  }
}
