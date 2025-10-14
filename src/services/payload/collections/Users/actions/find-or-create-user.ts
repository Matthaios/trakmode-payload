import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { createNewUser } from './create-new-user'
import { Session } from '@/services/auth'
import { getOrCreateCustomer } from '@/services/payments/customer'
import { payloadClient } from '@/services/payload/client'
async function getUserFromPayload(id: string) {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: {
      authId: {
        equals: id,
      },
    },
    limit: 1,
  })
  return docs?.[0]
}
export const findOrCreateUser = async (user: Session['user']) => {
  let userDoc = await getUserFromPayload(user.id)
  if (userDoc) {
    if (!user.stripeCustomerId) {
      await getOrCreateCustomer(user.id, user.email!)
      userDoc = await getUserFromPayload(user.id)
    }

    return userDoc
  }

  return await createNewUser(user)
}
