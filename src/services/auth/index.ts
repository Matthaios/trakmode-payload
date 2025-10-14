import db from './db'
import * as schema from './schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { magicLink, openAPI, twoFactor } from 'better-auth/plugins'

import { createNewUser } from '@/payload/collections/Users/actions/create-new-user'
import { env } from '@/env'

// your drizzle instance
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema,
  }),
  cookiePrefix: 'trakmode',
  secret: env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 24 * 10, // 10 days
  },
  user: {
    additionalFields: {
      stripeCustomerId: {
        type: 'string',
        required: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await createNewUser(user as unknown as Session['user'])
        },
      },
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    twoFactor({}),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        console.log('sendMagicLink', email, token, url)
      },
    }),
    openAPI(),
    nextCookies(),
  ],
})

export type Session = typeof auth.$Infer.Session
