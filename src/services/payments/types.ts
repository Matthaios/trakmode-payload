import type Stripe from 'stripe'

export type StripeSubscriptionCache = {
  subscriptionId: string | null
  status: Stripe.Subscription.Status
  priceId: string | null
  currentPeriodStart: number | null
  currentPeriodEnd: number | null
  cancelAtPeriodEnd: boolean
  paymentMethod: {
    brand: string | null
    last4: string | null
  } | null
} | { status: 'none' }

export type CheckoutType = 'subscription' | 'one-time'

export type CreateCheckoutParams = {
  userId: string
  userEmail: string
  stripePriceId: string
  type: CheckoutType
  successUrl?: string
  cancelUrl?: string
  metadata?: Record<string, string>
}
