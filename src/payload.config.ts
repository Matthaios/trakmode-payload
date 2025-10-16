// storage-adapter-import-placeholder
import { env } from '@/env'
import { collections } from '@/payload/collections'
import { Users } from '@/payload/collections/Users'
import { storage } from '@/payload/plugins/storage'
import { TrakmodeTenantPlugin } from '@/payload/plugins/tenant'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { EmailPlugin } from './services/payload/plugins/email'
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
      importMapFile: path.resolve(dirname, 'app/(payload)/importMap.js'),
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
    slug: 'folders',
  },

  collections,
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: env.DEVELOPMENT_MONGO_URI,
  }),
  sharp,
  telemetry: false,
  plugins: [storage, TrakmodeTenantPlugin, EmailPlugin],
})
