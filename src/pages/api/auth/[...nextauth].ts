import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import { prisma } from '../../../../prisma/client'
import { EmailProvider } from '../../../lib/auth/EmailProvider'

import { createUserWithEmail, getUserByEmail } from '../../../models/User'

export type NextAuthRequest = NextApiRequest &
  (IncomingMessage & { cookies: Partial<{ [key: string]: string }> })

export type NextAuthResponse = NextApiResponse | ServerResponse

//simple logger
function log(message: string) {
  console.log(`🔑 [NextAuth] ${message}`)
}

export const getAuthOptions = (): // request: NextAuthRequest,
// response: NextAuthResponse
NextAuthOptions => {
  return {
    adapter: PrismaAdapter(prisma),
    secret: process.env.JWT_SECRET,
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.user = user
        }
        // Handle adding more data to the JWT token
        return token
      },
      async signIn({ user, profile, account, ...rest }) {
        try {
          const userEmail =
            account?.userId ||
            account?.providerAccountId ||
            user?.email ||
            profile?.email

          const testEmail = (email: string) => {
            if (email.endsWith(`@${process.env.ALLOWED_EMAIL_DOMAIN}`)) {
              return true
            } else {
              return false
            }
          }

          if (!userEmail || !testEmail(userEmail)) {
            throw new Error('Email not found')
          }

          // Check for database user
          const existingUser = await getUserByEmail(userEmail)
          if (existingUser) {
            log(`Existing user: ${JSON.stringify(existingUser, null, 2)}`)
            return true
          }

          const newUser = await createUserWithEmail(userEmail)
          if (newUser) {
            log(`New user: ${JSON.stringify(newUser, null, 2)}`)
            return true
          }
          return false
        } catch (e) {
          console.error(e)
          return false
        }
      },
    },
    providers: [EmailProvider()],
    pages: {
      error: '/error',
      signOut: '/logout',
      signIn: '/login',
      verifyRequest: '/verify',
    },
  }
}

const nextAuthRoute = (
  request: NextApiRequest,
  response: NextApiResponse
): any => NextAuth(request, response, getAuthOptions())

export default nextAuthRoute
