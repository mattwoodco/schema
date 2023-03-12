export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: 'Speak with your documents',
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
