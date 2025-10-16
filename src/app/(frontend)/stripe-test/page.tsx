import { Button } from '@/ui/base/buttons/button'
import { auth } from '@/services/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { stripe } from '@/services/payments'
import { getClientSideURL } from '@/utils/getURL'

export default async function StripeTestPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session || !session?.user?.email) {
    return redirect('/dashboard/login?redirect=/stripe-test')
  }
  const chechout = await stripe.checkout.sessions.create({
    customer_email: session?.user?.email,
    success_url: `${getClientSideURL()}/stripe-test`,
    cancel_url: `${getClientSideURL()}/stripe-test`,
    metadata: {
      userId: session?.user?.id,
    },
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Test',
          },
          unit_amount: 2000,
        },
      },
    ],
  })
  return (
    <div>
      <h1> Stripe Test</h1>
      <p>{session?.user?.email}</p>
      <p>
        <Button href={chechout.url || ''}>Test</Button>
      </p>
    </div>
  )
}
