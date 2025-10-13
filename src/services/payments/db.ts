// import "dotenv/config";
import { env } from '@/env'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

// Use separate Turso database for payments
const paymentsDb = drizzle({
  connection: {
    url: env.PAYMENTS_DB_URL,
    authToken: env.PAYMENTS_DB_TOKEN,
  },
  schema,
})

export default paymentsDb
