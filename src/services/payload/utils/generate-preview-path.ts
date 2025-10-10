import { CollectionSlug } from 'payload'
import { env } from '@/env'
const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  offers: '/offers',
  users: '/profile',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const path = `${collectionPrefixMap[collection]}/${slug}`

  const params = {
    slug,
    collection,
    path,
    previewSecret: env.PREVIEW_SECRET,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  return `/next/preview?${encodedParams.toString()}`
}
