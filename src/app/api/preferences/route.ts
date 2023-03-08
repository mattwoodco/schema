import { getPreferencesByUserId, upsertPreferences } from '@/models/Preferences'
import { getUserByEmail } from '@/models/User'
import { getAuthOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export async function GET() {
  const options = await getAuthOptions()
  const session = await getServerSession(options)
  const preferences = await getPreferencesByUserId(session?.user?.email!)

  return new Response(JSON.stringify({ preferences }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  const options = await getAuthOptions()
  const session = await getServerSession(options)

  if (session?.user?.email) {
    const userRecord = await getUserByEmail(session?.user.email)

    try {
      const res = await upsertPreferences(userRecord?.id!, body)

      return new Response('good to go', {
        status: 200,
      })
    } catch (error) {
      return new Response('something went wrong', {
        status: 500,
      })
    }
  }
}
