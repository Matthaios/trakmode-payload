import { CollectionBeforeOperationHook } from 'payload'

export const bo_update_user_prefix: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (['create'].includes(operation)) {
    const collection = args.collection.config.slug

    args.data.prefix = `${collection}/${args.data?.tenantId || req.user?.id}`

    return args
  }
}
