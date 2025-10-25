import type { CollectionConfig } from 'payload'

export const Tutorials: CollectionConfig = {
  slug: 'tutorials',
  admin: {
    group: 'Education',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'instructor',
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
      options: ['production', 'mixing', 'sound-design', 'music-theory', 'gear-review'],
    },
    {
      name: 'contentType',
      type: 'select',
      options: ['video', 'article', 'course', 'webinar'],
      defaultValue: 'video',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL (YouTube, etc.)',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Article Content',
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duration (minutes)',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price (€)',
    },
    {
      name: 'isFree',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
