'use client'

import { signOut } from 'next-auth/react'

export const SignOut = () => {
  return (
    <button
      onClick={() => signOut()}
      className="border-0 appearance-none bg-transparent text-current font-semibold"
    >
      Logout
      {/* ✕ */}
    </button>
  )
}
