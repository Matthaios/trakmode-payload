'use client'
import { env } from '@/env'
import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
