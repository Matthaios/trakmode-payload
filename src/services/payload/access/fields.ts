import { FieldAccess } from 'payload'

export const isAdminField: FieldAccess<{ id: string }> = ({ req: { user } }): boolean => {
  return Boolean(user?.role === 'admin')
}
