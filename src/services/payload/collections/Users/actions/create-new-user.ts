import { Session } from '@/services/auth'
import { getOrCreateCustomer } from '@/services/payments/customer'

import { payloadClient } from '@/services/payload/client'
import { BasePayload } from 'payload'

const adminEmails = ['matemislov90@gmail.com']

export const createNewUser = async (user: Session['user'], reqPayload?: BasePayload) => {
  const payload = reqPayload || (await payloadClient())
  // TODO: Better username generation needed
  const username = user.email.split('@')[0]

  // If stripeCustomerId is not provided, create it
  if (!user.stripeCustomerId) {
    user.stripeCustomerId = await getOrCreateCustomer(user.id, user.email)
  }

  // Create Payload user first
  const payloadUser = await payload.create({
    collection: 'users',
    data: {
      id: user.id,
      name: user.name,
      stripeCustomerId: user.stripeCustomerId,
      email: user.email,
      role: adminEmails.includes(user.email) ? 'admin' : 'user',
      username,
    },
  })

  return payloadUser
}
