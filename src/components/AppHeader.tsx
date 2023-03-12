import { SignOut } from '@/app/(auth)/components'
import { roleToNumber } from '@/utils/roleToNumber'
import { capitalCase } from 'change-case'
import { Session } from 'next-auth'

const links = [
  // { href: '/', label: 'Start' },
  { href: '/latest', label: 'Guests', minRole: 'GUEST' }, // GUESTS
  { href: '/members', label: 'Members', minRole: 'MEMBER' }, // MEMBERS
  { href: '/profile', label: 'Artists', minRole: 'PARTNER' }, // PARTNERS
  { href: '/admin', label: 'Admins', minRole: 'ADMIN' }, // ADMIN
]

const LinkNav = ({
  links,
  session,
}: {
  links: { href: string; label: string; minRole: string }[]
  session: Session | null
}) => {
  if (!session) return null

  return (
    <nav className="flex gap-0">
      {links.map(
        (link) =>
          roleToNumber(session?.user?.role as string) >=
            roleToNumber(link.minRole) &&
          session && (
            <a href={link.href} key={link.href} className="p-5 py-12">
              {link.label}
            </a>
          )
      )}
    </nav>
  )
}

// async function queryFn() {
//   const results = await axios('/api/preferences')
//   return results.data
// }

export default function AppHeader({
  session,
}: // preferences,
{
  session: Session | null
  // preferences: any
}) {
  // const { data: preferencesResult } = useQuery({
  //   queryKey: ['preferences'],
  //   queryFn,
  // })
  return (
    <header className="py-10 px-6 md:px-8">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center">
          <a
            href="/"
            className="w-36 md:w-64 flex gap-2 pointer-events-auto mr-auto py-5 md:py-10"
          >
            <img src="/images/logotype.svg" alt="" />
            {/* <LogoType /> */}
          </a>

          <LinkNav links={links} session={session} />

          {session && (
            <>
              <div className="flex border-x-2 border-white/20 px-5">
                <a href="/settings" className="pointer-events-auto">
                  <div>{session?.user?.email}</div>
                  <div>{capitalCase(session?.user?.role as string)}</div>
                </a>
              </div>
              <SignOut />
            </>
          )}

          {/* {preferencesResult && (
            <PreferenceToggle
              preference="isTableVisible"
              value={preferencesResult['isTableVisible']}
            />
          )} */}
        </div>
      </div>
    </header>
  )
}
