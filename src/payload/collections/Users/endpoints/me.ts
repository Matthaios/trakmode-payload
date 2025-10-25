import { auth } from '@/services/auth'
import { headers } from 'next/headers'
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

    const user = await findOrCreateUser(session?.user)
    return Response.json({
      user: user,
    })
  },
}
