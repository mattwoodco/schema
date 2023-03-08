'use client'

import { useSearchParams } from 'next/navigation'

export default function RegisterNewUser() {
  const params = useSearchParams()

  return (
    <div className="max-w-screen-2xl mx-auto">
      <h2 className="text-3xl">Error</h2>
      <div className="text-[6vh]">
        <div>{params?.get('error')}</div>
      </div>

      <div className="flex fap-10">
        <a href="/" className="text-blue-500">
          Home
        </a>
        <a href="/login" className="text-blue-500">
          Back to Login
        </a>
      </div>
    </div>
  )
}
