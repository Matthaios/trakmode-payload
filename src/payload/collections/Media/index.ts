import type { CollectionConfig } from 'payload'
import { bo_update_user_prefix } from './hooks/beforeOperation'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  trash: true,
  hooks: {
    beforeOperation: [bo_update_user_prefix],
  },
  admin: {
    hideAPIURL: true,
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
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
