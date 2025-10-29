import { redirect } from 'next/navigation'
import { ServerProps } from 'payload'

export default async function AdminRedirects(props: ServerProps) {
  const { payload, user } = props
  const segments = props.params?.segments
  if (!segments) return null

  const path = typeof segments === 'string' ? segments : segments.join('/')

  if (path === 'account' || path == 'collections/users') {
    redirect(`/dashboard/collections/users/${user?.id}`)
  }
  payload.logger.info(path)

  return <span>REDIRECTS</span>
}
