import { CollectionBeforeOperationHook, CollectionConfig, Config, Field } from 'payload'

export const tenantFieldSlug = 'tenantId'

export const tenantField: Field = {
  name: tenantFieldSlug,
  type: 'text',
  admin: {
    position: 'sidebar',
  },
}

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
      if (['users', 'media', 'private', 'offers', 'orders'].includes(collection.slug)) {
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
