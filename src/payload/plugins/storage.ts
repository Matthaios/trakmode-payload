import { s3Storage } from '@payloadcms/storage-s3'

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
  bucket: process.env.R2_BUCKET!,
  clientUploads: true,

  config: {
    endpoint: process.env.R2_ENDPOINT!,
    region: process.env.R2_REGION!,

    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  },
})
