import { isAdmin } from '@/payload/collections/Users/access'
import type { CollectionConfig } from 'payload'
import { bo_update_user_prefix } from './Media/hooks/beforeOperation'

export const PrivateAssets: CollectionConfig = {
  slug: 'private',
  access: {
    read: isAdmin,
  },
  admin: {},
  hooks: {
    beforeOperation: [bo_update_user_prefix],
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
