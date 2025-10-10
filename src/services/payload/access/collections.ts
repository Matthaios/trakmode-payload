import { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin')
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
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

export const isAdminOrOwner: Access = ({ req: { user } }) => {
  if (user) {
    if (user.role === 'admin') {
      return true
    }
    return {
      tenantId: {
        equals: user.authId,
      },
    }
  }

  return false
}

export const isOwner: Access = ({ req: { user } }) => {
  if (user) {
    return {
      tenantId: {
        equals: user.authId,
      },
    }
  }

  return false
}
