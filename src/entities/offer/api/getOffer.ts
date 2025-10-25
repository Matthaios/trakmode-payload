import { payloadClient } from '@/payload/client'
import type { Offer } from '../model/types'

export async function getOffer(id: string): Promise<Offer | null> {
  const payload = await payloadClient()
  
  try {
    const offer = await payload.findByID({
      collection: 'offers',
      id,
    })
    return offer
  } catch (error) {
    return null
  }
}
