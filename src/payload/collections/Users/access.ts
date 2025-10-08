import { User } from '@/payload-types'
import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access<User> = ({ req: { user } }): boolean => {
  return Boolean(user?.role === 'admin')
}

export const isAdminFieldAccess: FieldAccess<{ id: string }, User> = ({
  req: { user },
}): boolean => {
  return Boolean(user?.role === 'admin')
}

export const isAdminOrSelf: Access<User> = ({ req: { user } }) => {
  if (user) {
    if (user.role === 'admin') {
      return true
    }
    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}
