import { isAdmin, isAdminOrSelf } from '@/payload/access/collections'
import { generatePreviewPath } from '@/payload/utils/generate-preview-path'
import type { CollectionConfig } from 'payload'
import { meEndpoint } from './endpoints/me'
import { betterAuthStrategy } from './strategies/better-auth'

import { isAdminField } from '@/payload/access/fields'
import { formatSlugHook } from '@/payload/fields/slug/formatSlug'
import { getServerSideURL } from '@/utils/getURL'

export const Users: CollectionConfig = {
  slug: 'users',

  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
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
    {
      name: 'authId',
      type: 'text',
      admin: {
        hidden: true,
        position: 'sidebar',
      },

      required: true,
    },
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
              name: 'name',
              type: 'text',
            },

            { name: 'Bio', type: 'richText' },
            { name: 'avatar', type: 'upload', relationTo: 'media' },
            { name: 'cover', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Orders',
          access: {
            create: () => false,
            update: () => false,
          },
          fields: [
            {
              name: 'orders',
              label: false,
              type: 'join',
              collection: 'orders',
              on: 'authId',
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
