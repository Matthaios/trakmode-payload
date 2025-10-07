import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
  schema: ['./src/db/auth-schema.ts'],
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URI!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
})
