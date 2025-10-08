import type { FieldHook } from 'payload'
import slugify from 'slugify'
export const formatSlug = (val: string): string => slugify(val, { lower: true, strict: true })

export const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return slugify(value, { lower: true, strict: true })
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallbackField] || data?.[fallbackField]

      if (fallbackData && typeof fallbackData === 'string') {
        return slugify(fallbackData, { lower: true, strict: true })
      }
    }

    return value
  }
