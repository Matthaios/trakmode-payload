import { CollectionConfig } from 'payload'
import { isAdminOrTenantOwner } from '@/payload/access/collections'
import { getServerSideURL } from '@/utils/getURL'
import { generatePreviewPath } from '@/payload/utils/generate-preview-path'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    defaultColumns: ['title', 'price', 'createdAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.id,
          collection: 'offers',
        }),
    },
  },
  access: {
    create: () => true,
    update: isAdminOrTenantOwner,
    delete: isAdminOrTenantOwner,
    read: isAdminOrTenantOwner,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
  ],
}
