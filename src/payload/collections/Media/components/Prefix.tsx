'use client'

import { useAuth, useDocumentInfo, useField } from '@payloadcms/ui'
import { useEffect } from 'react'

export const Prefix = () => {
  const { collectionSlug } = useDocumentInfo()
  const auth = useAuth()
  const prefix = useField({ path: 'prefix' })

  useEffect(() => {
    if (!auth.user) return
    if (collectionSlug === prefix.value) {
      prefix.setValue(`${collectionSlug}/${auth.user.id}`)
    }
  }, [prefix.value, auth.user, collectionSlug, prefix])
  return null
}
