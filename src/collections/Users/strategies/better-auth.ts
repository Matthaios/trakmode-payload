import { AuthStrategyFunction } from 'payload'

export const betterAuthStrategy: AuthStrategyFunction = async ({ payload }) => {
  const { docs } = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'matemislov90@gmail.com',
      },
    },
  })
  const user = docs?.[0] || null

  return {
    user: {
      ...user,
      collection: 'users',
    },
  }
}
