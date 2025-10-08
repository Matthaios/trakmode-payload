import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import payloadConfig from '@/payload.config'

export default async function ProfilePage({ params }) {
  const { username } = await params
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'users',
    where: {
      username: { equals: username },
    },
  })
  const user = docs?.[0] || null
  return (
    <div>
      {' '}
      {draft && <LivePreviewListener />}
      <div>
        <h1>{username}</h1>
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
