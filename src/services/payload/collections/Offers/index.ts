import { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Info',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            { name: 'cover', type: 'upload', relationTo: 'media' },
            {
              name: 'description',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Assets',
          fields: [
            {
              name: 'files',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}
