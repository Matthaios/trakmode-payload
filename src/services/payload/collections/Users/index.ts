import { isAdmin, isAdminOrSelf } from '@/payload/access/collections'
import { generatePreviewPath } from '@/payload/utils/generate-preview-path'
import type { CollectionConfig } from 'payload'
import { meEndpoint } from './endpoints/me'
import { betterAuthStrategy } from './strategies/better-auth'

import { isAdminField } from '@/payload/access/fields'
import { formatSlugHook } from '@/payload/fields/slug/formatSlug'
import { getServerSideURL } from '@/utils/getURL'
import { ObjectId } from 'mongodb'
import { privateField } from '../../utils/fields'
import { revalidateTag } from 'next/cache'
import { tenantFieldSlug } from '../../plugins/tenant'

export const Users: CollectionConfig = {
  slug: 'users',

  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        console.log('beforeValidate', data)
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
          label: 'Orders',

          fields: [
            {
              name: 'offers',
              type: 'join',
              collection: 'offers',
              admin: {
                defaultColumns: ['title', 'createdAt'],
                disableListColumn: true,
                disableListFilter: true,
              },
              orderable: false,
              on: tenantFieldSlug,
            },
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
