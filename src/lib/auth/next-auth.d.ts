// https://next-auth.js.org/getting-started/typescript

// import { JWT } from "next-auth/jwt"

import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role: 'GUEST' | 'ENGINEER' | 'ADMIN'
    } & DefaultSession['user']
  }
}

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//     idToken?: string
//   }
// }

/**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
//  */
// interface User {}
// /**
//  * Usually contains information about the provider being used
//  * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
//  */
// interface Account {}
// /** The OAuth profile returned from your provider */
// interface Profile {}
