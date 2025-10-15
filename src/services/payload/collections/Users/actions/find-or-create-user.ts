import { Session } from '@/services/auth'
import { payloadClient } from '@/services/payload/client'
import { createNewUser } from './create-new-user'
import { getOrCreateCustomer } from '@/services/payments/customer'
import { tenantFieldSlug } from '@/services/payload/plugins/tenant'
async function getUserFromPayload(id: string) {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: {
      [tenantFieldSlug]: {
        equals: id,
      },
    },
    limit: 1,
  })

  return docs?.[0]
}
export const findOrCreateUser = async (user: Session['user']) => {
  let userDoc = await getUserFromPayload(user.id)
  if (!userDoc) {
    userDoc = await createNewUser(user)
  }
  // If stripeCustomerId is not provided, create it
  if (!userDoc.stripeCustomerId) {
    userDoc.stripeCustomerId = await getOrCreateCustomer(userDoc.id, user.email)
  }
  return userDoc
}
