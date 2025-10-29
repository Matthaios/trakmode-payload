'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/shared/ui/base/buttons/button'
import type { YouTubeVideoBlock } from '@/features/profile-blocks/ui/model/types'

interface YouTubeBlockProps {
  block: YouTubeVideoBlock
}

/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/embed/VIDEO_ID
 */
function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null

  // Handle youtu.be short URLs
  const shortUrlMatch = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (shortUrlMatch) {
    return shortUrlMatch[1]
  }

  // Handle youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/)
  if (watchMatch) {
    return watchMatch[1]
  }

  // Handle youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/)
  if (embedMatch) {
    return embedMatch[1]
  }

  // If it's already just a video ID, return it
  if (/^[a-zA-Z0-9_-]+$/.test(url)) {
    return url
  }

  return null
}

/**
 * Renders a single YouTube video embed
 */
function YouTubeEmbed({ videoId }: { videoId: string }) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`

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
export function YouTubeBlock({ block }: YouTubeBlockProps) {
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
  const noVideosToShow = 4
  const hasMoreThanFour = validVideos.length > noVideosToShow
  const videosToShow =
    hasMoreThanFour && !isExpanded ? validVideos.slice(0, noVideosToShow) : validVideos

  return (
    <section id="youtube-videos" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Featured Videos</h2>

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
