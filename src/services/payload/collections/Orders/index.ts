import { CollectionConfig } from 'payload'
import { isAdminOrOwner } from '../../access/collections'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    hidden: true,
  },
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
    read: isAdminOrOwner,
  },
  fields: [
    {
      name: 'orderId',
      type: 'text',
    },
    { name: 'authId', type: 'relationship', relationTo: 'users', hasMany: false },
  ],
}
