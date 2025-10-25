import { isAdmin, isAdminOrSelf } from '@/payload/access/collections'
import { generatePreviewPath } from '@/payload/utils/generate-preview-path'
import type { CollectionConfig } from 'payload'
import { meEndpoint } from './endpoints/me'
import { betterAuthStrategy } from './strategies/better-auth'

import { isAdminField } from '@/payload/access/fields'
import { formatSlugHook } from '@/payload/fields/slug/formatSlug'
import { getServerSideURL } from '@/utils/getURL'
import { privateField } from '../../utils/fields'
import { revalidateTag } from 'next/cache'
import { tenantFieldSlug } from '../../plugins/tenant'

export const Users: CollectionConfig = {
  slug: 'users',

  access: {
    create: () => false,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        // @ts-ignore
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
    hidden: ({ user }) => {
      return user?.role !== 'admin'
    },

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
          ],
        },
        {
          label: 'Links',
          name: 'links',
          fields: [
            { name: 'website', type: 'text', admin: { placeholder: 'https://www.example.com' } },
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
        {
          label: 'Creator Profile',
          fields: [
            // Professional Information
            {
              type: 'row',
              fields: [
                {
                  name: 'stageName',
                  label: 'Stage Name',
                  type: 'text',
                },
                {
                  name: 'location',
                  type: 'text',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'genres',
                  type: 'array',
                  fields: [
                    {
                      name: 'genre',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'yearsActive',
                  type: 'number',
                  label: 'Years Active',
                },
              ],
            },
            {
              name: 'verificationStatus',
              type: 'select',
              options: ['verified', 'pending', 'unverified'],
              defaultValue: 'unverified',
            },

            // Music-Specific Content
            {
              name: 'featuredTrack',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Track',
            },
            {
              name: 'discography',
              type: 'array',
              label: 'Discography',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'releaseDate',
                  type: 'date',
                },
                {
                  name: 'genre',
                  type: 'text',
                },
              ],
            },

            // Social & Platform Links (additional)
            {
              type: 'row',
              fields: [
                {
                  name: 'spotify',
                  type: 'text',
                  admin: { placeholder: 'https://open.spotify.com/artist/...' },
                },
                {
                  name: 'appleMusic',
                  label: 'Apple Music',
                  type: 'text',
                  admin: { placeholder: 'https://music.apple.com/artist/...' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'soundcloud',
                  type: 'text',
                  admin: { placeholder: 'https://soundcloud.com/...' },
                },
                {
                  name: 'bandcamp',
                  type: 'text',
                  admin: { placeholder: 'https://bandcamp.com/...' },
                },
              ],
            },
            {
              name: 'beatport',
              type: 'text',
              admin: { placeholder: 'https://www.beatport.com/artist/...' },
            },
          ],
        },
        {
          label: 'Orders',

          fields: [
            {
              name: 'orders',
              type: 'join',
              collection: 'orders',
              on: tenantFieldSlug,
              admin: {
                allowCreate: false,
              },
            },
          ],
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
