import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Commerce',
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
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price (€)',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: ['digital-download', 'physical-merch', 'exclusive-content'],
    },
    {
      name: 'downloadUrl',
      type: 'text',
      label: 'Download URL (for digital products)',
    },
    {
      name: 'stock',
      type: 'number',
      label: 'Stock Quantity',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
