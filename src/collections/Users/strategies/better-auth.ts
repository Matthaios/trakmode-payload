import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import type { AuthStrategyFunctionArgs, AuthStrategy } from 'payload'

export const betterAuthStrategy: AuthStrategy = {
  name: 'better-auth',
  authenticate: async ({ payload }: AuthStrategyFunctionArgs) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session) {
      return {
        user: null,
      }
    }
    const { docs } = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: session?.user?.email,
        },
      },
    })
    const user = docs?.[0] || null

    return {
      user: {
        ...user,
        collection: 'users',
      },
    }
  },
}
