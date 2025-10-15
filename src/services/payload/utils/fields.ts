import { Field } from 'payload'

export const privateField = (field: Field): Field => {
  return {
    ...field,
    admin: {
      ...field.admin,
      position: 'sidebar',
      readOnly: true,
    },
  }
}
