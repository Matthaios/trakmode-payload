import { auth } from '@/lib/auth'
import { cookies, headers } from 'next/headers'
import { Endpoint } from 'payload'

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
    return Response.json({
      user: session?.user,
      token,
      exp: session?.session.expiresAt
        ? Math.floor(new Date(session.session.expiresAt).getTime() / 1000)
        : null,
    })
  },
}
