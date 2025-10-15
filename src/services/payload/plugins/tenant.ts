import { CollectionBeforeOperationHook, CollectionConfig, Config, Field } from 'payload'
import { privateField } from '../utils/fields'

export const tenantFieldSlug = 'user'

export const tenantField: Field = privateField({
  name: 'user',
  type: 'relationship',
  relationTo: 'users',
  hasMany: false,
  required: true,

  admin: {
    readOnly: true,
    position: 'sidebar',
  },
})

function addTenantField(collection: CollectionConfig) {
  return {
    ...collection,
    fields: [
      // @ts-ignore
      ...collection.fields.filter((field) => field?.name !== tenantFieldSlug),
      tenantField,
    ],
  }
}

const setTenantOperation: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    console.log('setTenantOperation', args.data, req.user)
    args.data[tenantFieldSlug] = args.data[tenantFieldSlug] || req.user?.id
  }
  return args
}

export function TrakmodeTenantPlugin(config: Config): Config {
  const collections = [...(config.collections || [])]
  return {
    ...config,
    collections: collections.map((collection) => {
      if (['media', 'private', 'offers', 'orders'].includes(collection.slug)) {
        return addTenantField({
          ...collection,
          admin: {
            ...collection.admin,
            baseFilter: ({ req }) => {
              if (req.user?.role === 'admin') {
                return true
              }
              return {
                [tenantFieldSlug]: {
                  equals: req.user?.id,
                },
              }
            },
          },
          hooks: {
            ...(collection.hooks || {}),
            beforeOperation: [...(collection.hooks?.beforeOperation || []), setTenantOperation],
          },
        } as CollectionConfig)
      }
      return collection
    }) as CollectionConfig[],
  }
}
