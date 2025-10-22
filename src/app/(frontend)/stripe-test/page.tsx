import { auth } from '@/services/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Checkout } from '@/features/payments/Checkout'

export default async function StripeTestPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session || !session?.user?.email) {
    return redirect('/dashboard/login?redirect=/stripe-test')
  }
  return (
    <div>
      <h1> Stripe Test</h1>
      <p>{session?.user?.email}</p>
      <Checkout amount={2000} email={session.user.email} />
    </div>
  )
}
