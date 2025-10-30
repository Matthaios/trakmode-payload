'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'
import Image from 'next/image'

interface AudioPlayerBlockData {
  title?: string
  audioFile?: string | { url: string } | { id: string; url?: string }
  description?: string
  thumbnail?: string | { url: string } | { id: string; url?: string }
  source?: string
  id?: string
  blockName?: string
  blockType: 'audio-player-block'
}

interface AudioPlayerBlockProps {
  block: AudioPlayerBlockData
}

/**
 * Formats seconds into MM:SS format
 */
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
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
 * Play/Pause button component
 * Positioned in top right corner
 */
function PlayButton({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        <Pause className="w-5 h-5" fill="currentColor" />
      ) : (
        <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
      )}
    </button>
  )
}

/**
 * Waveform visualization component
 * Flexible waveform that fits between title and play button
 */
function Waveform({
  progress,
  heights,
  onSeek,
}: {
  progress: number
  heights: number[]
  onSeek: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
}) {
  return (
    <div className="flex-1 min-w-0">
      <div
        className="relative w-full h-14 cursor-pointer group"
        onClick={onSeek}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSeek(e)
          }
        }}
        aria-label="Seek audio"
      >
        <div className="absolute inset-0 flex items-center justify-between" style={{ gap: '1px' }}>
          {heights.map((barHeight, i) => {
            const barProgress = i / heights.length
            const isPlayed = barProgress < progress

            return (
              <div
                key={i}
                className={`transition-all duration-200 ${
                  isPlayed ? 'bg-white' : 'bg-gray-700 group-hover:bg-gray-600'
                }`}
                style={{
                  flex: '1 1 0%',
                  minWidth: '1px',
                  height: `${Math.max(barHeight * 100, 20)}%`,
                  opacity: isPlayed ? 1 : 0.4,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * Thumbnail image component
 * Compact square format similar to album art
 */
function Thumbnail({ url, alt }: { url: string; alt: string }) {
  return (
    <div className="flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border border-gray-800">
      <Image src={url} alt={alt} fill className="object-cover" sizes="80px" />
    </div>
  )
}

/**
 * Title section component
 * Displays title (large, prominent) and source/collection (smaller, lighter text below)
 */
function TitleSection({
  title,
  source,
  currentTime,
  duration
}: {
  title?: string
  source?: string
  currentTime?: number
  duration?: number
}) {
  if (!title && !source) return null

  return (
    <div className="flex flex-col min-w-0">
      {title && <h3 className="text-base font-medium text-white truncate">{title}</h3>}
      {source && <span className="text-xs text-gray-400 truncate">{source}</span>}
      {duration && duration > 0 && (
        <div className="text-xs text-white mt-0.5">
          <span className="tabular-nums">
            {formatTime(currentTime || 0)} / {formatTime(duration)}
          </span>
        </div>
      )}
    </div>
  )
}

/**
 * Audio Player Block renderer component
 * Clean, minimal dark-themed audio player
 */
export function AudioPlayerBlockRenderer({ block }: AudioPlayerBlockProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Generate stable waveform bar heights
  // More bars on desktop (160), fewer on mobile (80) for better performance
  const barCount = isMobile ? 80 : 160
  const waveformHeights = useMemo(() => {
    return Array.from({ length: barCount }).map(() => Math.random() * 0.5 + 0.3)
  }, [barCount])

  const audioUrl = extractUrl(block.audioFile)
  const thumbnailUrl = extractUrl(block.thumbnail)

  if (!audioUrl) {
    return null
  }

  const progress = duration > 0 ? currentTime / duration : 0

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (!audioRef.current || duration === 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = 'clientX' in e ? e.clientX - rect.left : rect.width / 2
    const clickRatio = x / rect.width
    const newTime = clickRatio * duration

    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <section id="audio-player-block" className="w-full">
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        {/* Single row: Thumbnail, Title/Subtitle/Time, Waveform, Play button */}
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          {thumbnailUrl && <Thumbnail url={thumbnailUrl} alt={block.title || 'Audio track'} />}

          {/* Title Section with time display below - takes only needed space */}
          <div className="flex-shrink-0">
            <TitleSection
              title={block.title}
              source={block.source}
              currentTime={currentTime}
              duration={duration}
            />
          </div>

          {/* Waveform bars - fills remaining space */}
          {duration > 0 && (
            <Waveform progress={progress} heights={waveformHeights} onSeek={handleSeek} />
          )}

          {/* Play Button on the right, vertically centered */}
          <div className="flex-shrink-0">
            <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />
    </section>
  )
}
