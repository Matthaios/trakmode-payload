/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { TextField, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

export const AudioFieldWithPreview: TextFieldClientComponent = (props) => {
  // For now, just use a basic text field
  // We can enhance this later with audio preview if needed
  return <TextField {...props} />
}
