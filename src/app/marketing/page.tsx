import AppHeader from '@/components/AppHeader'
import { MarketingPage } from '@/components/MarketingPage/MarketingPage'
import { getSession } from 'next-auth/react'

export default async function AppEntry() {
  const session = await getSession()
  // const user = await createUserWithEmail(session?.user?.email as string)
  // const preferences: any = await getPreferencesByUserId(user.id)

  return (
    <>
      <AppHeader
        session={session}
        // preferences={preferences}
      />
      <MarketingPage />
    </>
  )
}
