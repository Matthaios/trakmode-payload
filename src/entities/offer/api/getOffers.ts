import { payloadClient } from '@/payload/client'
import type { Offer } from '../model/types'

export async function getOffers(limit = 10): Promise<{ docs: Offer[]; totalDocs: number }> {
  const payload = await payloadClient()
  const result = await payload.find({
    collection: 'offers',
    limit,
  })

  return result
}
