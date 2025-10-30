/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { TextField, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import {
  isValidYouTubeUrl,
  getYouTubeThumbnailUrl,
  extractYouTubeVideoId,
} from '@/blocks/youtube-video-block/youtube-utils'

export const VideoFieldWithPreview: TextFieldClientComponent = (props) => {
  console.log(props)
  const value = useField<string>({ path: props.path })
  console.log(value)
  const videoId = extractYouTubeVideoId(value.value as string)
  const isValid = isValidYouTubeUrl(value.value as string)

  return (
    <>
      <TextField {...props} />
      {isValid && videoId && (
        <img
          src={getYouTubeThumbnailUrl(videoId)}
          alt="Video thumbnail"
          style={{ maxWidth: '100%', height: 'auto', marginTop: '8px' }}
        />
      )}
    </>
  )
}
