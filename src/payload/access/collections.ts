import { Access } from 'payload'
import { tenantFieldSlug } from '../plugins/tenant'

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

export const isAdminOrTenantOwner: Access = ({ req: { user } }) => {
  if (user) {
    if (user.role === 'admin') {
      return true
    }
    return {
      [tenantFieldSlug]: {
        equals: user.id,
      },
    }
  }

  return false
}

export const isTenantOwner: Access = ({ req: { user } }) => {
  if (user) {
    return {
      [tenantFieldSlug]: {
        equals: user.id,
      },
    }
  }

  return false
}
