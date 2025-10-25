import { Field } from 'payload'

export const privateField = (field: Field): Field => {
  return {
    ...field,
    admin: {
      ...(typeof field.admin === 'object' && field.admin !== null ? field.admin : {}),
      position: 'sidebar',
      readOnly: true,
      ...(process.env.NODE_ENV !== 'development' && { hidden: true }),
    },
  } as Field
}
