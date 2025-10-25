import { CollectionConfig } from 'payload'
import { isAdminOrTenantOwner } from '@/payload/access/collections'
import { tenantField } from '@/payload/plugins/tenant'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    hidden: false,
  },
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
    read: () => true,
  },
  fields: [
    tenantField,
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
    },

    {
      name: 'orderId',
      type: 'text',
      required: true,
      unique: true,
    },

    {
      name: 'offerId',
      type: 'relationship',
      relationTo: 'offers',
      hasMany: false,
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      required: true,
      defaultValue: 'usd',
    },
    {
      name: 'purchaseDate',
      type: 'date',
      required: true,
    },

    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Succeeded', value: 'succeeded' },
        { label: 'Failed', value: 'failed' },
        { label: 'Pending', value: 'pending' },
      ],
      defaultValue: 'pending',
    },
  ],
}
