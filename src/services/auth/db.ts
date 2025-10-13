// import "dotenv/config";
import { env } from '@/env'
import { drizzle } from 'drizzle-orm/libsql'

// You can specify any property from the libsql connection options
const db = drizzle({
  connection: {
    url: env.AUTH_DB_URL,
    authToken: env.AUTH_DB_TOKEN,
  },
})

export default db
