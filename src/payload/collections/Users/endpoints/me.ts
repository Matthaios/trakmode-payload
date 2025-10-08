import { auth } from '@/lib/auth'
import { cookies, headers } from 'next/headers'
import { Endpoint } from 'payload'
import { findOrCreateUser } from '../actions/find-or-create-user'

export const meEndpoint: Endpoint = {
  path: '/me',
  method: 'get',
  handler: async () => {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
      return Response.json(
        {
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }
    const token = (await cookies()).get('better-auth.session_token')?.value
    const user = await findOrCreateUser(session?.user)
    return Response.json({
      user: user,
      token,
      exp: session?.session.expiresAt
        ? Math.floor(new Date(session.session.expiresAt).getTime() / 1000)
        : null,
    })
  },
}
