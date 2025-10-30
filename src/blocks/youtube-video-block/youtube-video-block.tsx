'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/shared/ui/base/buttons/button'
import type { YouTubeVideoBlock } from './youtube-video-block.config'
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from './youtube-utils'

interface YouTubeVideoBlockProps {
  block: YouTubeVideoBlock
}

/**
 * Renders a single YouTube video embed
 */
function YouTubeEmbed({ videoId }: { videoId: string }) {
  const embedUrl = getYouTubeEmbedUrl(videoId)

  return (
    <div className="relative w-full shrink-0" style={{ aspectRatio: '16/9' }}>
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full rounded-lg"
      />
    </div>
  )
}

/**
 * YouTube video block renderer component
 * Renders an array of YouTube videos in a responsive grid
 * - Mobile: Horizontal scrollable carousel with scroll-snap
 * - Desktop: Grid layout (2 columns)
 * - Collapsible: Shows first 4 videos by default when there are more than 4
 */
export function YouTubeVideoBlockRenderer({ block }: YouTubeVideoBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!block.videos || block.videos.length === 0) {
    return null
  }

  const validVideos = block.videos
    .map((item) => {
      if (!item.video) return null
      const videoId = extractYouTubeVideoId(item.video)
      return videoId ? { videoId, originalUrl: item.video } : null
    })
    .filter((video): video is { videoId: string; originalUrl: string } => video !== null)

  if (validVideos.length === 0) {
    return null
  }

  const noVideosToShow = block.collapseCount || 4
  const hasMoreThanFour = validVideos.length > noVideosToShow
  const videosToShow =
    hasMoreThanFour && !isExpanded ? validVideos.slice(0, noVideosToShow) : validVideos

  return (
    <section id="youtube-video-block" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">{block.title || 'Featured Videos'}</h2>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-3 px-3">
          {videosToShow.map((video, index) => (
            <div
              key={index}
              className="w-[85vw] snap-start shrink-0 border border-secondary rounded-lg overflow-hidden"
            >
              <YouTubeEmbed videoId={video.videoId} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-6">
        {videosToShow.map((video, index) => (
          <div key={index} className="border border-secondary rounded-lg overflow-hidden">
            <YouTubeEmbed videoId={video.videoId} />
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {hasMoreThanFour && (
        <div className="flex justify-center">
          <Button
            size="md"
            color="secondary"
            onClick={() => setIsExpanded(!isExpanded)}
            iconTrailing={
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            }
          >
            {isExpanded ? 'Show Less' : `Show ${validVideos.length - noVideosToShow} More`}
          </Button>
        </div>
      )}
    </section>
  )
}
