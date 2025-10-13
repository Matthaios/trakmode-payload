import { env } from '@/env'
import { stripe } from '@/services/payments'

const enpointSecret = env.STRIPE_WEBHOOK_SECRET
