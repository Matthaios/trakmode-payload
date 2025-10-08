import { Session } from '@/lib/auth'
import payloadConfig from '@/payload.config'
import { customAlphabet } from 'nanoid'

import { getPayload } from 'payload'

const adminEmails = ['matemislov90@gmail.com']

export const createNewUser = async (user: Session['user']) => {
  const payload = await getPayload({ config: payloadConfig })

  return payload.create({
    collection: 'users',
    data: {
      name: user.name,
      email: user.email,
      role: adminEmails.includes(user.email) ? 'admin' : 'user',
      username: customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)(),
    },
  })
}
