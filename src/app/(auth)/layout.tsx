export const metadata = {
  title: process.env.APP_NAME,
  description: 'Speak with your documents',
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
