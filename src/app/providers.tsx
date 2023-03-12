'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        themes={['light', 'dark', 'custom-theme']}
      >
        <Provider>{children}</Provider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
