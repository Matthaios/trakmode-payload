import { LoginPage } from '@/features/login-page/login-page'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const { redirect } = await searchParams
  return <LoginPage redirect={redirect} />
}
