import type { Block } from 'payload'
import { parseYouTubeUrl } from './youtube-utils'

/**
 * Payload CMS configuration for YouTube Video Block
 */
export const YouTubeVideoBlock: Block = {
  slug: 'youtube-video-block',
  labels: {
    singular: 'YouTube Video Block',
    plural: 'YouTube Video Blocks',
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
              defaultValue: 'Featured Videos',
              admin: {
                description: 'Title displayed above the videos',
              },
            },
            {
              label: false,
              name: 'videos',
              type: 'array',
              labels: {
                singular: 'Video',
                plural: 'Videos',
              },
              fields: [
                {
                  name: 'video',
                  type: 'text',
                  label: 'YouTube URL',
                  admin: {
                    components: {
                      Field: {
                        path: '@/blocks/youtube-video-block/admin/Field.tsx#VideoFieldWithPreview',
                      },
                    },
                    placeholder:
                      'https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID',
                    description: 'Enter a YouTube video URL. Supports various YouTube URL formats.',
                  },
                  validate: (value: string | string[] | null | undefined) => {
                    if (!value || typeof value !== 'string') return true // Optional field

                    // Basic URL validation
                    try {
                      new URL(value)
                    } catch {
                      return 'Please enter a valid URL'
                    }

                    // Check if it's a YouTube URL
                    const youtubeRegex =
                      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
                    if (!youtubeRegex.test(value)) {
                      return 'Please enter a valid YouTube URL'
                    }

                    return true
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
              defaultValue: 4,
              min: 1,
              max: 20,
              admin: {
                description:
                  'Number of videos shown before collapse (when more videos are available)',
              },
            },
          ],
        },
      ],
    },
  ],
}
