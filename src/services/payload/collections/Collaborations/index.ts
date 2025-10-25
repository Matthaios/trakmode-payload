import type { CollectionConfig } from 'payload'

export const Collaborations: CollectionConfig = {
  slug: 'collaborations',
  admin: {
    group: 'Network',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'participants',
      type: 'array',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role (e.g., Producer, Artist)',
        },
      ],
    },
    {
      name: 'projectType',
      type: 'select',
      options: ['track', 'album', 'remix', 'video', 'live-performance', 'other'],
    },
    {
      name: 'status',
      type: 'select',
      options: ['planning', 'in-progress', 'completed', 'cancelled'],
      defaultValue: 'planning',
    },
    {
      name: 'startDate',
      type: 'date',
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'outcome',
      type: 'textarea',
      label: 'Outcome/Result',
    },
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
}
