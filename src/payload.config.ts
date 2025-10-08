// storage-adapter-import-placeholder
import * as authTables from '@/db/auth-schema'
import { Media } from '@/payload/collections/Media'
import { Offers } from '@/payload/collections/Offers'
import { Users } from '@/payload/collections/Users'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  routes: {
    admin: '/dashboard',
    api: '/api',
  },

  admin: {
    meta: {
      title: 'Trakmode',
      applicationName: 'Trakmode',
      assets: ['/assets/favicon.svg'],
    },
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },

    components: {
      logout: {
        Button: {
          path: '@/payload/components/admin/logout/LogoutButton.tsx#LogoutButton',
        },
      },
      graphics: {
        Logo: {
          path: '@/payload/components/admin/graphics/logo.tsx#Logo',
        },
        Icon: {
          path: '@/payload/components/admin/graphics/icon.tsx#Icon',
        },
      },
    },
  },
  folders: {
    browseByFolder: false,
  },

  collections: [Offers, Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
    beforeSchemaInit: [
      // @ts-ignore
      ({ schema }) => {
        return {
          ...schema,
          tables: {
            ...schema.tables,
            ...authTables,
          },
        }
      },
    ],
  }),
  sharp,
  telemetry: false,
  plugins: [],
})
