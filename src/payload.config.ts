// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import * as authTables from '@/db/auth-schema'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Offers } from './collections/Offers'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  routes: {
    admin: '/dashboard',
    api: '/api',
  },

  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: {
          path: '@/components/admin/graphics/logo.tsx#Logo',
        },
        Icon: {
          path: '@/components/admin/graphics/icon.tsx#Icon',
        },
      },
      views: {
        adminLogin: {
          path: '/login',
          Component: {
            path: '@/collections/Users/components/Login.tsx',
          },
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
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
