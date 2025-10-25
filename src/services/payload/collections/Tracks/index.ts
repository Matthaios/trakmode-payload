import type { CollectionConfig } from 'payload'

export const Tracks: CollectionConfig = {
  slug: 'tracks',
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
      name: 'audioFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'album',
      type: 'text',
    },
    {
      name: 'genre',
      type: 'text',
    },
    {
      name: 'releaseDate',
      type: 'date',
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duration (seconds)',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'streamingLinks',
      type: 'group',
      fields: [
        { name: 'spotify', type: 'text' },
        { name: 'appleMusic', type: 'text' },
        { name: 'soundcloud', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
  ],
}
