import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Services',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'artist',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'select',
      options: ['production', 'mixing-mastering', 'sound-design', 'consultation', 'custom-work'],
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price (€)',
    },
    {
      name: 'pricingType',
      type: 'select',
      options: ['fixed', 'hourly', 'project-based'],
      defaultValue: 'fixed',
    },
    {
      name: 'deliveryTime',
      type: 'text',
      label: 'Delivery Time (e.g., 3-5 days)',
    },
    {
      name: 'portfolio',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
