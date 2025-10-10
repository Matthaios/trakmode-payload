import type { CollectionConfig } from 'payload'
import { isAdminOrOwner } from '../access/collections'
export const PrivateAssets: CollectionConfig = {
  slug: 'private',
  labels: {
    singular: 'File',
    plural: 'Files',
  },
  access: {
    read: isAdminOrOwner,
  },

  folders: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: {
    bulkUpload: true,
  },
}
