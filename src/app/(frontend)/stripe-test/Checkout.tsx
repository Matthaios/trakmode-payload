'use client'
import { stripePromise } from '@/services/payments/load'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'

export function StripeCheckout({
  options,
}: {
  options: {
    clientSecret: string
  }
}) {
  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}
