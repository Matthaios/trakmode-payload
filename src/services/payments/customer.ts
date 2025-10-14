import { stripe } from './index'
import paymentsDb from './db'
import { stripeCustomers } from './schema'
import { eq } from 'drizzle-orm'
import db from '../auth/db'
import { user } from '../auth/schema'
import { auth } from '../auth'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { payloadClient } from '../payload/client'

export async function getOrCreateCustomer(
  userId: string,
  email: string,
): Promise<Stripe.Customer['id']> {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    throw new Error('User not found in session')
  }

  if (session?.user?.stripeCustomerId) {
    return session.user.stripeCustomerId
  }

  const stripeCustomer = await stripe.customers.search({
    query: `email:'${email}'`,
    limit: 1,
  })

  if (stripeCustomer.data.length > 0) {
    return stripeCustomer.data[0].id
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  })

  if (customer.id) {
    const payload = await payloadClient()
    await db.update(user).set({ stripeCustomerId: customer.id }).where(eq(user.id, userId))
    await payload.update({
      collection: 'users',
      id: userId,
      data: { stripeCustomerId: customer.id },
    })
  } else {
    throw new Error('Failed to create Stripe customer')
  }

  return customer.id
}

export async function getCustomerId(userId: string): Promise<string | null> {
  const customer = await paymentsDb
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1)

  return customer.length > 0 ? customer[0].stripeCustomerId : null
}
