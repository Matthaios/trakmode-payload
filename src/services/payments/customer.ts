import { stripe } from './index'
import paymentsDb from './db'
import { stripeCustomers } from './schema'
import { eq } from 'drizzle-orm'

export async function getOrCreateCustomer(userId: string, email: string): Promise<string> {
  // Check database for existing mapping
  const existingCustomer = await paymentsDb
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId))
    .limit(1)

  if (existingCustomer.length > 0) {
    return existingCustomer[0].stripeCustomerId
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  })

  // Store mapping in database
  await paymentsDb.insert(stripeCustomers).values({
    userId: userId,
    stripeCustomerId: customer.id,
    email,
  })

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
