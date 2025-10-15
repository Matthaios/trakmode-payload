import payloadConfig from '@/payload.config'
import db from '@/services/auth/db'
import { user } from '@/services/auth/schema'
import { tenantFieldSlug } from '@/services/payload/plugins/tenant'
import { stripe } from '@/services/payments'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import Stripe from 'stripe'

export const handleStripeWebhook = async (req: Request) => {
  let event: Stripe.Event

  try {
    const stripeSignature = (await headers()).get('stripe-signature')

    event = stripe.webhooks.constructEvent(
      await req.text(),
      stripeSignature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    )
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err)
    console.log(`❌ Error message: ${errorMessage}`)
    return NextResponse.json({ message: `Webhook Error: ${errorMessage}` }, { status: 400 })
  }

  // Successfully constructed event.
  console.log('✅ Success:', event.id)

  const permittedEvents: string[] = [
    'checkout.session.completed',
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
  ]

  if (permittedEvents.includes(event.type)) {
    let data

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          data = event.data.object as Stripe.Checkout.Session
          console.log(`💰 CheckoutSession status: ${data.payment_status}`)

          if (data.payment_status === 'paid' && data.payment_intent) {
            await createOrderFromCheckoutSession(data)
          }
          break
        case 'payment_intent.payment_failed':
          data = event.data.object as Stripe.PaymentIntent
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`)
          break
        case 'payment_intent.succeeded':
          data = event.data.object as Stripe.PaymentIntent
          console.log(`💰 PaymentIntent status: ${data.status}`)

          if (data.status === 'succeeded') {
            await createOrderFromPaymentIntent(data)
          }
          break
        default:
          throw new Error(`Unhandled event: ${event.type}`)
      }
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: 'Webhook handler failed' }, { status: 500 })
    }
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 })
}

async function createOrderFromCheckoutSession(session: Stripe.Checkout.Session) {
  try {
    const payload = await getPayload({ config: payloadConfig })

    // Get customer ID from session
    const customerId = session.customer as string
    if (!customerId) {
      console.error('No customer ID in checkout session')
      return
    }

    // Find user by Stripe customer ID
    const authUser = await db
      .select()
      .from(user)
      .where(eq(user.stripeCustomerId, customerId))
      .limit(1)

    if (authUser.length === 0) {
      console.error(`No user found for Stripe customer ${customerId}`)
      return
    }

    const userId = authUser[0].id
    const paymentIntentId = session.payment_intent as string
    const amount = session.amount_total || 0
    const currency = session.currency || 'usd'
    const offerId = session.metadata?.offerId as string

    // Create order record
    await payload.create({
      collection: 'orders',
      data: {
        orderId: session.id,
        [tenantFieldSlug]: userId,
        stripePaymentIntentId: paymentIntentId,
        amount: amount / 100, // Convert from cents
        currency,
        purchaseDate: new Date().toISOString(),
        status: 'succeeded',
      },
    })

    console.log(`✅ Order created for user ${userId} from checkout session ${session.id}`)
  } catch (error) {
    console.error('Failed to create order from checkout session:', error)
  }
}

async function createOrderFromPaymentIntent(paymentIntent: Stripe.PaymentIntent) {
  try {
    const payload = await getPayload({ config: payloadConfig })

    // Get customer ID from payment intent
    const customerId = paymentIntent.customer as string
    if (!customerId) {
      console.error('No customer ID in payment intent')
      return
    }

    // Find user by Stripe customer ID
    const authUser = await db
      .select()
      .from(user)
      .where(eq(user.stripeCustomerId, customerId))
      .limit(1)

    if (authUser.length === 0) {
      console.error(`No user found for Stripe customer ${customerId}`)
      return
    }

    const userId = authUser[0].id
    const amount = paymentIntent.amount
    const currency = paymentIntent.currency
    const offerId = paymentIntent.metadata?.offerId

    // Create order record
    await payload.create({
      collection: 'orders',
      data: {
        orderId: paymentIntent.id,
        [tenantFieldSlug]: userId,
        offerId: offerId || null,
        stripePaymentIntentId: paymentIntent.id,
        amount: amount / 100, // Convert from cents
        currency,
        purchaseDate: new Date().toISOString(),
        status: 'succeeded',
      },
    })

    console.log(`✅ Order created for user ${userId} from payment intent ${paymentIntent.id}`)
  } catch (error) {
    console.error('Failed to create order from payment intent:', error)
  }
}
