import type { CollectionConfig } from 'payload'

export const TourEvents: CollectionConfig = {
  slug: 'tour-events',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
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
      name: 'eventDate',
      type: 'date',
      required: true,
    },
    {
      name: 'venue',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'ticketPrice',
      type: 'number',
      label: 'Ticket Price (€)',
    },
    {
      name: 'ticketUrl',
      type: 'text',
    },
    {
      name: 'rsvpEnabled',
      type: 'checkbox',
      defaultValue: false,
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
      name: 'status',
      type: 'select',
      options: ['upcoming', 'past', 'cancelled'],
      defaultValue: 'upcoming',
    },
  ],
}
