import { isAdmin, isAdminOrSelf } from '@/payload/access/collections'
import { generatePreviewPath } from '@/payload/utils/generate-preview-path'
import type { CollectionConfig } from 'payload'
import { meEndpoint } from './endpoints/me'
import { betterAuthStrategy } from './strategies/better-auth'

import { isAdminField } from '@/payload/access/fields'
import { formatSlugHook } from '@/payload/fields/slug/formatSlug'
import { privateField } from '@/payload/utils/fields'
import { getServerSideURL } from '@/shared/lib/utils/getURL'
import { revalidateTag } from 'next/cache'
import { slugField } from '@/payload/fields/slug'
import { YouTubeVideoBlock } from '@/blocks/youtube-video-block/youtube-video-block.config'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Profile',
    plural: 'Profile',
  },

  access: {
    create: () => false,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.id) {
          throw new Error('ID is required')
        }

        return data
      },
    ],
    afterChange: [
      ({ data }) => {
        revalidateTag(`user:profile:${data?.username}`)
      },
    ],
  },

  admin: {
    defaultColumns: ['name', 'email', 'username', 'role', 'createdAt'],
    group: 'User Management',
    hideAPIURL: true,
    useAsTitle: 'name',

    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.username === 'string' ? data.username : '',
          collection: 'users',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = '/profile/' + data?.username

      return `${getServerSideURL()}${path}`
    },
  },
  auth: {
    disableLocalStrategy: true,
    strategies: [betterAuthStrategy],
  },
  endpoints: [meEndpoint],

  fields: [
    privateField({
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    }),
    privateField({
      name: 'stripeCustomerId',
      type: 'text',
    }),

    {
      name: 'username',
      type: 'text',
      admin: {
        position: 'sidebar',

        description: 'WARNING: Changing this will change the url of your profle.',
      },
      hooks: {
        beforeValidate: [formatSlugHook('name')],
      },
      unique: true,
      required: true,
    },
    {
      name: 'email',
      type: 'email',

      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Info',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  label: 'Full Name',
                  type: 'text',
                },
                {
                  name: 'tagline',
                  label: 'Tagline',
                  type: 'text',
                },
              ],
            },

            { name: 'bio', type: 'richText' },
            { name: 'avatar', type: 'upload', relationTo: 'media' },
            { name: 'cover', type: 'upload', relationTo: 'media' },
            {
              type: 'collapsible',
              label: 'Links',

              fields: [
                {
                  name: 'links',
                  label: false,
                  type: 'group',
                  admin: {
                    hideGutter: false,
                  },
                  fields: [
                    {
                      name: 'website',
                      type: 'text',
                      admin: { placeholder: 'https://www.example.com' },
                    },
                    {
                      name: 'twitter',
                      label: 'X (Twitter)',
                      type: 'text',
                      admin: { placeholder: 'https://x.com/example' },
                    },
                    {
                      name: 'instagram',
                      type: 'text',
                      admin: { placeholder: 'https://www.instagram.com/example' },
                    },
                    {
                      name: 'linkedin',
                      type: 'text',
                      admin: { placeholder: 'https://www.linkedin.com/in/example' },
                    },
                    {
                      name: 'youtube',
                      type: 'text',
                      admin: { placeholder: 'https://www.youtube.com/example' },
                    },
                    {
                      name: 'tiktok',
                      type: 'text',
                      admin: { placeholder: 'https://www.tiktok.com/@example' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'profile',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              blocks: [YouTubeVideoBlock],
            },
          ],
          label: 'Profile',
        },
      ],
    },
    {
      name: 'role',
      type: 'select',
      saveToJWT: true,
      options: ['admin', 'creator', 'user'],
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'user',
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
  ],
}
