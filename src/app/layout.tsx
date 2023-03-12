import '@/utils/ag-grid.css'
import '@/utils/ag-theme-alpine.css'
import '@/utils/globals.css'
import '@uiw/react-textarea-code-editor/dist.css'
import { Inter } from 'next/font/google'
import 'reactflow/dist/style.css'
import Providers from './providers'

const inter = Inter()

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: 'Speak with your documents',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await getServerSession(getAuthOptions())
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.svg" />
      </head>
      <body
        className={`${inter.className} flex-col flex h-full overflow-auto font-semibold w-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
