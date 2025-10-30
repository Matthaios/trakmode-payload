'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/shared/ui/base/buttons/button'
import { useGlobalAudioPlayer } from '@/features/global-audio-player/model/useGlobalAudioPlayer'
import type { AudioPlayerBlock } from './audio-player-block.config'

interface AudioPlayerBlockProps {
  block: AudioPlayerBlock
}


/**
 * Extracts URL from various Payload media formats
 */
function extractUrl(
  media: string | { url: string } | { id: string; url?: string } | undefined,
): string | undefined {
  if (!media) return undefined
  if (typeof media === 'string') return media
  if (typeof media === 'object' && 'url' in media) return media.url
  return undefined
}



/**
 * Thumbnail image component
 * Compact square format for list layout
 */
function Thumbnail({ url, alt }: { url: string; alt: string }) {
  return (
    <div className="flex-shrink-0 relative w-14 h-14 rounded-md overflow-hidden">
      <Image src={url} alt={alt} fill className="object-cover" sizes="56px" />
    </div>
  )
}

/**
 * Title section component
 * Displays title and subtitle (no time display - that's in the global player)
 */
function TitleSection({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex flex-col min-w-0">
      <h3 className="text-base font-medium text-white truncate">{title}</h3>
      {subtitle && <span className="text-xs text-gray-400 truncate">{subtitle}</span>}
    </div>
  )
}

/**
 * Formats seconds into MM:SS format
 */
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Single audio player component
 * List layout: Thumbnail, Title/Subtitle, Duration
 * Clicking anywhere plays in global player
 */
function SingleAudioPlayer({
  track,
  trackId,
}: {
  track: NonNullable<AudioPlayerBlock['audioFiles']>[number]
  trackId: string
}) {
  const { play, currentTrack, isPlaying, pause, duration } = useGlobalAudioPlayer()
  const [trackDuration, setTrackDuration] = useState<number | null>(null)

  const audioUrl = extractUrl(track.audioFile)
  const thumbnailUrl = extractUrl(track.thumbnail)

  if (!audioUrl) {
    return null
  }

  const isCurrentlyPlaying = currentTrack?.id === trackId && isPlaying

  // Load duration from audio metadata
  React.useEffect(() => {
    if (!audioUrl) return

    const audio = new Audio(audioUrl)
    audio.addEventListener('loadedmetadata', () => {
      setTrackDuration(audio.duration)
    })
    audio.preload = 'metadata'

    return () => {
      audio.removeEventListener('loadedmetadata', () => {})
    }
  }, [audioUrl])

  const handleClick = () => {
    if (isCurrentlyPlaying) {
      pause()
    } else {
      play({
        id: trackId,
        title: track.trackTitle,
        artist: track.subtitle,
        audioUrl,
        thumbnailUrl,
      })
    }
  }

  // Use current track duration if this is the playing track, otherwise use loaded duration
  const displayDuration = isCurrentlyPlaying && duration > 0
    ? duration
    : trackDuration

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-800/50 transition-colors ${
        isCurrentlyPlaying ? 'bg-[#6869DE]/20' : ''
      }`}
      aria-label={`Play ${track.trackTitle}`}
    >
      {/* Thumbnail */}
      {thumbnailUrl ? (
        <Thumbnail url={thumbnailUrl} alt={track.trackTitle} />
      ) : (
        <div className="flex-shrink-0 w-14 h-14 rounded-md bg-gray-700" />
      )}

      {/* Title and Subtitle - takes remaining space */}
      <div className="flex-1 min-w-0 text-left">
        <TitleSection title={track.trackTitle} subtitle={track.subtitle} />
      </div>

      {/* Duration on the right */}
      <div className="flex-shrink-0 text-sm text-gray-400 tabular-nums">
        {displayDuration ? formatDuration(displayDuration) : '--:--'}
      </div>
    </button>
  )
}

/**
 * Audio Player Block renderer component
 * Renders an array of audio players with expand/collapse functionality
 */
export function AudioPlayerBlockRenderer({ block }: AudioPlayerBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!block.audioFiles || block.audioFiles.length === 0) {
    return null
  }

  // Filter out invalid entries
  const validAudioTracks = block.audioFiles.filter(
    (track) => track.trackTitle && extractUrl(track.audioFile),
  )

  if (validAudioTracks.length === 0) {
    return null
  }

  const noTracksToShow = block.collapseCount || 3
  const hasMoreThanCount = validAudioTracks.length > noTracksToShow

  return (
    <section id="audio-player-block" className="w-full">
      {/* Title */}
      {block.title && <h2 className="text-2xl font-bold text-primary mb-6">{block.title}</h2>}

      {/* Audio Players List */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
        <div className="divide-y divide-gray-800">
          {validAudioTracks.map((track, index) => {
            // Only render tracks that should be visible
            const isVisible = !hasMoreThanCount || isExpanded || index < noTracksToShow
            if (!isVisible) return null

            // Generate a unique ID for this track
            const trackId = track.id || `track-${block.blockName || 'default'}-${index}`

            return (
              <SingleAudioPlayer key={trackId} track={track} trackId={trackId} />
            )
          })}
        </div>
      </div>

      {/* Show More/Less Button */}
      {hasMoreThanCount && (
        <div className="flex justify-center mt-6">
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
            {isExpanded ? 'Show Less' : `Show ${validAudioTracks.length - noTracksToShow} More`}
          </Button>
        </div>
      )}
    </section>
  )
}
