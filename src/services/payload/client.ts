import configPromise from '@/payload.config'
import { getPayload, SanitizedConfig } from 'payload'
export const payloadClient = (config: Promise<SanitizedConfig> | SanitizedConfig = configPromise) =>
  getPayload({ config })
