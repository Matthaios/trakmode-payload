import { CollectionBeforeOperationHook, CollectionConfig, Config, Plugin } from 'payload'
import { Media } from '../collections/Media'

function addTenantField(collection: CollectionConfig) {
  return {
    ...collection,
    fields: [
      ...collection.fields,
      {
        name: 'tenantId',
        type: 'text',
      },
    ],
  }
}

const setTenantOperation: CollectionBeforeOperationHook = ({ args, operation, context, req }) => {
  if (operation === 'create' || operation === 'update') {
    args.data.tenantId = args.data.tenantId || req.user?.id
  }
  return args
}

export function TrakmodeTenantPlugin(config: Config): Config {
  return {
    ...config,
    collections: (config.collections || []).map((collection) => {
      if (['media', 'private', 'offers'].includes(collection.slug)) {
        return addTenantField({
          ...collection,
          admin: {
            ...collection.admin,
            baseFilter: ({ req }) => {
              if (req.user?.role === 'admin') {
                return true
              }
              return {
                tenantId: {
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
