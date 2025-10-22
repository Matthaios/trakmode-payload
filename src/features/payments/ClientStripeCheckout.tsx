'use client'

import { stripePromise } from '@/services/payments/load'
import { Elements, type Appearance } from '@stripe/react-stripe-js'
import { useMemo } from 'react'

type ClientStripeCheckoutProps = {
  clientSecret: string
  children: React.ReactNode
}

function readCssVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

export function ClientStripeCheckout({ clientSecret, children }: ClientStripeCheckoutProps) {
  const appearance = useMemo<Appearance>(() => {
    const colorPrimary = readCssVar('--color-fg-brand-primary', '#635bff')
    const colorText = readCssVar('--color-text-primary', '#1a1a1a')
    const colorBackground = readCssVar('--color-bg-primary', '#ffffff')
    const borderRadius = '0px'
    return {
      theme: 'stripe',
      variables: {
        colorPrimary,
        colorText,
        colorBackground,
        borderRadius,
      },
      rules: {
        '.Input': {
          borderRadius,
        },
        '.Block': {
          backgroundColor: readCssVar('--background-color-secondary', '#f6f8fa'),
          borderRadius,
        },
      },
    }
  }, [])

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      {children}
    </Elements>
  )
}
