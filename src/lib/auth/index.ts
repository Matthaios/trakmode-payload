import db from '@/db'
import * as schema from '@/db/auth-schema'
import { redis } from '@/lib/redis'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { magicLink, openAPI, twoFactor } from 'better-auth/plugins'

// your drizzle instance
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema,
  }),
  cookiePrefix: 'trakmode',
  secret: process.env.BETTER_AUTH_SECRET!,
  session: {
    expiresIn: 60 * 60 * 24 * 10, // 10 days
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  user: {
    modelName: 'auth_users',
  },

  secondaryStorage: {
    get: async (key) => {
      console.log('redisget', key)
      return await redis.get(key)
    },
    set: async (key, value) => {
      console.log('redisset', key, value)
      return await redis.set(key, value)
    },
    delete: async (key) => {
      console.log('redisdelete', key)
      await redis.del(key)
    },
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
