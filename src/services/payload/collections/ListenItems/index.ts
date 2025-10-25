import type { CollectionConfig } from 'payload'

export const ListenItems: CollectionConfig = {
  slug: 'listen-items',
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
      name: 'type',
      type: 'select',
      options: ['podcast', 'radio-show', 'guest-mix', 'live-stream'],
      required: true,
    },
    {
      name: 'platform',
      type: 'text',
      label: 'Platform/Podcast Name',
    },
    {
      name: 'episodeTitle',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Listen URL',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'publishDate',
      type: 'date',
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duration (seconds)',
    },
  ],
}
