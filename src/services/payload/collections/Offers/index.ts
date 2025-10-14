import { CollectionConfig } from 'payload'
import { isAdminOrTenantOwner } from '../../access/collections'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
    read: isAdminOrTenantOwner,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
