import { getSession } from '@/services/auth'
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) {
    return redirect('/login')
  }
  return <>{children}</>
}
