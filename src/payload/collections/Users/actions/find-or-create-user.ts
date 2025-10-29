import { payloadClient } from '@/payload/client'
import { User } from '@/payload/payload-types'
import { Session } from '@/services/auth'
import { getOrCreateCustomer } from '@/services/payments/customer'
import { createNewUser } from './create-new-user'
async function getUserFromPayload(id: string) {
  const payload = await payloadClient()
  const user = await payload.findByID({
    collection: 'users',
    id,
  })

  return user as User
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
