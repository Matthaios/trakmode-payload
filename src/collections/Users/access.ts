import type { Access } from 'payload'

// Helper function to check if user is admin
const isAdmin = (user: any): boolean => {
  return user?.role === 'admin'
}

// Helper function to check if user is accessing their own data
const isAccessingSelf = ({ id, user }: { id?: string | number; user: any }): boolean => {
  return Boolean(user && id && user.id === String(id))
}

// Any authenticated user can create an account
export const createAccess: Access = ({ req }) => {
  return Boolean(req.user)
}

// Only admins can update users
export const updateAccess: Access = ({ req }) => {
  return isAdmin(req.user)
}

// Only admins can delete users
export const deleteAccess: Access = ({ req }) => {
  return isAdmin(req.user)
}

// Users can read their own data, admins can read all
export const readAccess: Access = ({ req, id }) => {
  if (!req.user) {
    return false
  }

  // Admins can read all users
  if (isAdmin(req.user)) {
    return true
  }

  // Users can only read their own data
  if (isAccessingSelf({ id, user: req.user })) {
    return true
  }

  return false
}
