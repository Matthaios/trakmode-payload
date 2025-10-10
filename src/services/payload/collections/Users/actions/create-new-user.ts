import { Session } from '@/services/auth'
import payloadConfig from '@/payload.config'

import { getPayload } from 'payload'
import slugify from 'slugify'

const adminEmails = ['matemislov90@gmail.com']

export const createNewUser = async (user: Session['user']) => {
  const payload = await getPayload({ config: payloadConfig })
  // TODO: Better username generation
  const username = user.email.split('@')[0]
  return payload.create({
    collection: 'users',
    data: {
      id: user.id,
      authId: user.id,
      name: user.name,
      email: user.email,
      role: adminEmails.includes(user.email) ? 'admin' : 'user',
      username,
    },
  })
}
