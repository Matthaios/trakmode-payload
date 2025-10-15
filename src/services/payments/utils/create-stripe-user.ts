import { stripe } from '@/services/payments/index'
import Stripe from 'stripe'

export const createOrFindCustomer = async (
  userId: string,
  email: string,
): Promise<Stripe.Customer['id'] | null> => {
  const stripeCustomer = await stripe.customers.search({
    query: `email:'${email}'`,
    limit: 1,
  })

  if (stripeCustomer.data.length > 0) {
    return stripeCustomer.data[0].id
  }
  let newCustomer: Stripe.Customer
  try {
    newCustomer = await stripe.customers.create({
      email,
      metadata: {
        userId,
      },
    })
  } catch (error) {
    console.error('Failed to create Stripe customer:', error)
    return null
  }
  return newCustomer?.id || null
}
