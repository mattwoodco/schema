import { LogoType } from '@/components/logo/LogoType'
import axios from 'axios'
import { Session } from 'next-auth'

const links = [
  { href: '/', label: 'Start' },
  // { href: '/tree', label: 'Tree' },
  // { href: '/table', label: 'Table' },
  // { href: '/diagram', label: 'Diagram' },
  { href: '/location/xyz', label: 'Location' },
]

const LinkNav = ({ links }: { links: { href: string; label: string }[] }) => {
  return (
    <nav className="flex gap-12">
      {links.map((link) => (
        <a href={link.href} key={link.href} className="p-5 py-12">
          {link.label}
        </a>
      ))}
    </nav>
  )
}

async function queryFn() {
  const results = await axios('/api/preferences')
  return results.data
}

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
    <header className="panel-primary py-10 px-6 md:px-12">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center">
          <a
            href="/"
            className="w-36 md:w-28 flex gap-2 pointer-events-auto mr-auto py-5 md:py-0"
          >
            <LogoType />
          </a>

          {/* {session ? (
            <div className="flex gap-12">
              <a href="/settings" className="pointer-events-auto">
                <div>{session?.user?.email}</div>
                <div>{session?.user?.role}</div>
              </a>
              <SignOut />
            </div>
          ) : (
            <a href="/login">MK</a>
          )} */}

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
