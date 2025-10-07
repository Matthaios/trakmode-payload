import type { CollectionConfig } from 'payload'
import { deleteAccess, readAccess, updateAccess } from './access'
import { meEndpoint } from './endpoints/me'
import { betterAuthStrategy } from './strategies/better-auth'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: () => true,
    read: readAccess,
    update: updateAccess,
    delete: deleteAccess,
  },
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  auth: {
    disableLocalStrategy: true,
    strategies: [betterAuthStrategy],
  },
  endpoints: [meEndpoint],

  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'role',
      type: 'select',
      saveToJWT: true,
      options: ['admin', 'creator', 'user'],
      defaultValue: 'user',
      access: {
        update: ({ req }) => {
          // Only admins can change roles
          return req.user?.role === 'admin'
        },
      },
    },
  ],
}
