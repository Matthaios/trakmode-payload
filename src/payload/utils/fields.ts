import { Field } from 'payload'

export const privateField = (field: Field): Field => {
  // In development, show the field in sidebar as read-only
  if (process.env.NODE_ENV === 'development') {
    return {
      ...field,
      admin: {
        ...(typeof field.admin === 'object' && field.admin !== null ? field.admin : {}),
        position: 'sidebar',
        readOnly: true,
      },
    } as Field
  }

  // In production, hide the field completely
  return {
    ...field,
    admin: {
      ...(typeof field.admin === 'object' && field.admin !== null ? field.admin : {}),
      hidden: true,
    },
  } as Field
}
