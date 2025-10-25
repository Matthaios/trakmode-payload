import { CollectionConfig } from 'payload'

export const group = (name: string, collections: CollectionConfig[]) => {
  return collections.map((collection) => {
    return {
      ...collection,
      admin: {
        ...collection.admin,
        group: name,
      },
    }
  })
}
