// import "dotenv/config";
import { env } from '@/env'
import { drizzle } from 'drizzle-orm/libsql'

// You can specify any property from the libsql connection options
const db = drizzle({
  connection: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
})

export default db
