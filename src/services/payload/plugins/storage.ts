import { s3Storage } from '@payloadcms/storage-s3'
import { env } from '@/env'
export const storage = s3Storage({
  acl: 'private',
  collections: {
    media: {
      prefix: 'media',
    },
    private: {
      prefix: 'private',
      signedDownloads: {
        shouldUseSignedURL: () => true,
      },
    },
  },
  bucket: env.R2_BUCKET,
  clientUploads: true,

  config: {
    endpoint: env.R2_ENDPOINT,
    region: env.R2_REGION,

    credentials: {
      accessKeyId: env.R2_ACCESS_KEY,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  },
})
