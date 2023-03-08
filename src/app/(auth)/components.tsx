'use client'

import { signOut } from 'next-auth/react'

export const SignOut = () => {
  return (
    <button
      onClick={() => signOut()}
      className="text-xl leading-none font-black"
    >
      ✕
    </button>
  )
}
