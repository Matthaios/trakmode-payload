import { handleStripeWebhook } from '@/services/payments/webhooks'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { stripe } from '@/services/payments/stripe'
import { NextResponse } from 'next/server'
import { env } from '@/shared/config/env'

export async function POST(req: Request) {
  let event: Stripe.Event

  try {
    const stripeSignature = req.headers.get('stripe-signature')
    const body = await req.text()
    console.log(body, stripeSignature as string, env.STRIPE_WEBHOOK_SECRET)
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature as string,
      env.STRIPE_WEBHOOK_SECRET,
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
          break
        case 'payment_intent.payment_failed':
          data = event.data.object as Stripe.PaymentIntent
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`)
          break
        case 'payment_intent.succeeded':
          data = event.data.object as Stripe.PaymentIntent
          console.log(`💰 PaymentIntent status: ${data.status}`)
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
