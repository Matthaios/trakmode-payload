import db from './db'
import * as schema from './schema'
import { betterAuth, LiteralUnion, Models } from 'better-auth'
import { customAlphabet, nanoid } from 'nanoid'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { magicLink, openAPI, twoFactor } from 'better-auth/plugins'

import { createNewUser } from '@/payload/collections/Users/actions/create-new-user'
import { env } from '@/env'
import { createOrFindCustomer } from '../payments/utils/create-stripe-user'

// your drizzle instance
export const auth = betterAuth({
  appName: 'Trakmode',
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema,
  }),
  advanced: {
    cookiePrefix: 'PAYLOAD',
    database: {
      generateId: (options: { model: LiteralUnion<Models, string>; size?: number }) => {
        // must be a 24 character hex string
        const generateId = customAlphabet('abcdef0123456789', 24)
        return generateId(24)
      },
    },
  },
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
      role: {
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
          const stripeCustomerId = await createOrFindCustomer(user.id, user.email)
          await createNewUser({
            ...user,
            stripeCustomerId,
          } as unknown as Session['user'])
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
