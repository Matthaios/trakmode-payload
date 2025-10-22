'use client'

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
  type Appearance,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useCallback, useEffect, useMemo, useState } from 'react'

type CheckoutProps = {
  amount: number // cents
  email?: string
  currency?: string
}

export function Checkout({ amount, email, currency = 'usd' }: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const createIntent = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('/api/payments/intents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, currency, email }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Failed to create PaymentIntent')
        if (isMounted) setClientSecret(data.clientSecret)
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Unknown error'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }
    createIntent()
    return () => {
      isMounted = false
    }
  }, [amount, currency, email])

  const stripePromise = useMemo(
    () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string),
    [],
  )

  function readCssVar(name: string, fallback: string) {
    if (typeof window === 'undefined') return fallback
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    return value || fallback
  }

  const appearance = useMemo<Appearance>(() => {
    const colorPrimary = readCssVar('--color-fg-brand-primary', '#635bff')
    const colorText = readCssVar('--color-text-primary', '#1a1a1a')
    const colorBackground = readCssVar('--color-bg-primary', '#ffffff')
    const borderRadius = readCssVar('--radius-md', '6px')
    return {
      theme: 'stripe',
      variables: { colorPrimary, colorText, colorBackground, borderRadius },
      rules: {
        '.Input': { borderRadius },
        '.Block': {
          backgroundColor: readCssVar('--background-color-secondary', '#f6f8fa'),
          borderRadius,
        },
      },
    }
  }, [])

  return (
    <div style={{ maxWidth: 480 }}>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <InnerCheckout isLoading={isLoading} setIsLoading={setIsLoading} setError={setError} />
        </Elements>
      )}
      {error && (
        <div role="alert" style={{ color: 'var(--color-text-error-primary)' }}>
          {error}
        </div>
      )}
    </div>
  )
}

function InnerCheckout({
  isLoading,
  setIsLoading,
  setError,
}: {
  isLoading: boolean
  setIsLoading: (v: boolean) => void
  setError: (v: string | null) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const disabled = !stripe || !elements || isLoading

  const handleConfirm = useCallback(async () => {
    if (!stripe || !elements) return
    setIsLoading(true)
    setError(null)
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
    })
    if (confirmError) setError(confirmError.message || 'Payment failed')
    setIsLoading(false)
  }, [elements, setError, setIsLoading, stripe])

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <PaymentElement />
      <button
        disabled={disabled}
        onClick={handleConfirm}
        style={{
          height: 40,
          borderRadius: 8,
          backgroundColor: 'var(--color-bg-brand-solid)',
          color: 'var(--color-text-primary_on-brand)',
          border: '1px solid var(--color-border-brand)',
        }}
      >
        {isLoading ? 'Processing…' : 'Pay now'}
      </button>
    </div>
  )
}
