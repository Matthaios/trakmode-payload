import type { Block } from 'payload'

/**
 * Payload CMS configuration for Audio Player Block
 * Supports multiple audio files with expand/collapse functionality
 */
export const AudioPlayerBlock: Block = {
  slug: 'audio-player-block',
  labels: {
    singular: 'Audio Player Block',
    plural: 'Audio Player Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Featured Audio',
              admin: {
                description: 'Title displayed above the audio players',
              },
            },
            {
              label: false,
              name: 'audioFiles',
              type: 'array',
              labels: {
                singular: 'Audio Track',
                plural: 'Audio Tracks',
              },
              fields: [
                {
                  name: 'trackTitle',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Title of the audio track',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  admin: {
                    description: 'Optional subtitle or collection name',
                  },
                },
                {
                  name: 'audioFile',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    description: 'Upload an audio file (MP3, WAV, M4A, etc.)',
                  },
                  validate: (value: any) => {
                    if (!value) return 'Audio file is required'
                    return true
                  },
                },
                {
                  name: 'thumbnail',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Optional thumbnail image for the audio player',
                  },
                },
              ],
              minRows: 1,
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'collapseCount',
              type: 'number',
              defaultValue: 3,
              min: 1,
              max: 20,
              admin: {
                description:
                  'Number of audio tracks shown before collapse (when more tracks are available)',
              },
            },
          ],
        },
      ],
    },
  ],
}

export type AudioPlayerBlock = {
  blockName?: string
  blockType: 'audio-player-block'
  title?: string
  collapseCount?: number
  audioFiles?: Array<{
    trackTitle: string
    subtitle?: string
    audioFile?: string | { id: string; url?: string }
    thumbnail?: string | { id: string; url?: string }
    id?: string
  }>
}
