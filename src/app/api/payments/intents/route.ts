import { NextResponse } from 'next/server'
import { stripe } from '@/services/payments/stripe'

type CreateIntentBody = {
  amount: number
  currency?: string
  email?: string
  metadata?: Record<string, string>
}

export async function POST(req: Request) {
  try {
    const { amount, currency = 'usd', email, metadata }: CreateIntentBody = await req.json()

    if (
      !Number.isFinite(amount) ||
      !Number.isInteger(amount) ||
      amount < 50 ||
      amount > 1_000_000_00
    ) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata,
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
