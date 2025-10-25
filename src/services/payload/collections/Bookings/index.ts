import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    group: 'Services',
    useAsTitle: 'service',
  },
  fields: [
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      defaultValue: 'pending',
    },
    {
      name: 'bookingDate',
      type: 'date',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Client Notes',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Agreed Price (€)',
    },
    {
      name: 'deliveryDate',
      type: 'date',
    },
    {
      name: 'feedback',
      type: 'textarea',
      label: 'Client Feedback',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Client Rating (1-5)',
      min: 1,
      max: 5,
    },
  ],
}
