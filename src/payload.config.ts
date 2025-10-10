// storage-adapter-import-placeholder
import { Media } from '@/payload/collections/Media'
import { Offers } from '@/payload/collections/Offers'
import { PrivateAssets } from '@/payload/collections/PrivateAssets'
import { Users } from '@/payload/collections/Users'
import { storage } from '@/payload/plugins/storage'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { env } from '@/env'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { TrakmodeTenantPlugin } from '@/payload/plugins/tenant'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
export default buildConfig({
  bin: [
    {
      key: 'db:clear',
      scriptPath: path.resolve(dirname, 'src/scripts/clear-db.ts'),
    },
  ],
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
    slug: 'folders',
  },

  collections: [Offers, Users, Media, PrivateAssets],
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
  plugins: [storage, TrakmodeTenantPlugin],
})
