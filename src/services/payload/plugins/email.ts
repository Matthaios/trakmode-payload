import { Config } from 'payload'

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { env } from '@/env'
export function EmailPlugin(config: Config): Config {
  return {
    ...config,
    email: nodemailerAdapter({
      defaultFromAddress: env.SENDER_EMAIL,
      defaultFromName: 'Trakmode',
      // Nodemailer transportOptions
      transportOptions: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      },
    }),
  }
}
