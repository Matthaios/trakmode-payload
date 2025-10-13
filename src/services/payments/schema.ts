import { sqliteTable, text, integer, int } from 'drizzle-orm/sqlite-core'

export const stripeCustomers = sqliteTable('stripe_customers', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: text('auth_user_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id').notNull().unique(),
  email: text('email').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})
