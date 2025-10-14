import { Session } from '@/services/auth'
import { getOrCreateCustomer } from '@/services/payments/customer'

import { payloadClient } from '@/services/payload/client'
import { BasePayload } from 'payload'

const adminEmails = ['matemislov90@gmail.com']

export const createNewUser = async (user: Session['user'], reqPayload?: BasePayload) => {
  const payload = reqPayload || (await payloadClient())
  // TODO: Better username generation needed
  const username = user.email.split('@')[0]

  let stripeCustomerId = ''

  try {
    stripeCustomerId = await getOrCreateCustomer(user.id, user.email)
  } catch (error) {
    console.error(`❌ Failed to create Stripe customer for user ${user.id}:`, error)
  }

  // Create Payload user first
  const payloadUser = await payload.create({
    collection: 'users',
    data: {
      id: user.id,
      authId: user.id,
      name: user.name,
      stripeCustomerId,
      email: user.email,
      role: adminEmails.includes(user.email) ? 'admin' : 'user',
      username,
    },
  })

  return payloadUser
}
