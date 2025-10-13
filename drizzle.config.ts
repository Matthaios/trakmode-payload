import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

const DB = {
  auth: {
    schema: ['./src/services/auth/schema.ts'],
    out: './migrations/auth',
    dbCredentials: {
      url: process.env.AUTH_DB_URL!,
      authToken: process.env.AUTH_DB_TOKEN!,
    },
  },
  payments: {
    schema: ['./src/services/payments/schema.ts'],
    out: './migrations/payments',
    dbCredentials: {
      url: process.env.PAYMENTS_DB_URL!,
      authToken: process.env.PAYMENTS_DB_TOKEN!,
    },
  },
}

export default defineConfig({
  dialect: 'turso',
  ...DB[process.env.DRIZZLE_DB as keyof typeof DB],
})
