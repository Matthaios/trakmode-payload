import { payloadClient } from '@/payload/client'
import type { UserProfile } from '@/entities/user/model/types'

export async function getUserProfile(username: string): Promise<UserProfile | null> {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    depth: 1,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    where: {
      username: { equals: username },
    },
  })

  return docs?.[0] || null
}
