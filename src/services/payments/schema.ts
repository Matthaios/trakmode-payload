import { sqliteTable, text, integer, int } from 'drizzle-orm/sqlite-core'

export const stripeCustomers = sqliteTable('stripe_customers', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: text('auth_user_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id').notNull().unique(),
  email: text('email').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Table to track if the webhook has been processed
export const stripeWebhooks = sqliteTable('stripe_webhooks', {
  id: int().primaryKey({ autoIncrement: true }),
  webhookId: text('webhook_id').notNull().unique(),
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Table to keep all checkout sessions that are processed
// On PayloadCMS side this will be orders collection
export const stripeCheckoutSessions = sqliteTable('stripe_checkout_sessions', {
  id: int().primaryKey({ autoIncrement: true }),
  checkoutSessionId: text('checkout_session_id').notNull().unique(),
  userId: text('user_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})
