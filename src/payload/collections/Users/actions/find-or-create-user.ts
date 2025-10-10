import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { createNewUser } from './create-new-user'
import { Session } from '@/lib/auth'

export const findOrCreateUser = async (user: Session['user']) => {
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'users',
    where: {
      authId: {
        equals: user.id,
      },
    },
    limit: 1,
  })
  if (docs.length > 0) {
    return docs[0]
  }

  return await createNewUser(user)
}
