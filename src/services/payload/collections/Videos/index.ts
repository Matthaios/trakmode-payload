import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
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
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'select',
      options: ['music-video', 'dj-set', 'live-performance', 'behind-scenes', 'interview'],
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duration (seconds)',
    },
    {
      name: 'releaseDate',
      type: 'date',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
