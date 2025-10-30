'use client'

import { useGlobalAudioPlayer } from '../model/useGlobalAudioPlayer'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'

/**
 * Formats seconds into MM:SS format
 */
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Global audio player fixed to the bottom of the screen
 * Matches the design in the provided image
 */
export function GlobalAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isVisible,
    togglePlay,
    seek,
    toggleMute,
    isMuted,
    previousTrack,
    nextTrack,
  } = useGlobalAudioPlayer()

  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragTime, setDragTime] = useState<number | null>(null)

  // Use dragTime when dragging, otherwise use currentTime
  const displayTime = isDragging && dragTime !== null ? dragTime : currentTime
  const progressPercentage = duration > 0 && duration > 0 ? Math.min(100, Math.max(0, (displayTime / duration) * 100)) : 0

  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current || duration === 0 || !Number.isFinite(duration)) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const clickRatio = Math.max(0, Math.min(1, x / rect.width))
    const newTime = clickRatio * duration

    setIsDragging(true)
    setDragTime(newTime)
    seek(newTime)
  }, [duration, seek])

  const handleProgressMouseMove = useCallback((e: MouseEvent) => {
    if (!sliderRef.current || duration === 0 || !Number.isFinite(duration)) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const clickRatio = Math.max(0, Math.min(1, x / rect.width))
    const newTime = clickRatio * duration

    setDragTime(newTime)
    seek(newTime)
  }, [duration, seek])

  const handleProgressMouseUp = useCallback(() => {
    setIsDragging(false)
    setDragTime(null)
  }, [])

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleProgressMouseMove)
      document.addEventListener('mouseup', handleProgressMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleProgressMouseMove)
        document.removeEventListener('mouseup', handleProgressMouseUp)
      }
    }
  }, [isDragging, handleProgressMouseMove, handleProgressMouseUp])

  // Update drag time when currentTime changes externally (but not when dragging)
  useEffect(() => {
    if (!isDragging) {
      setDragTime(null)
    }
  }, [currentTime, isDragging])

  if (!isVisible || !currentTrack) {
    return null
  }


  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0D] border-t border-gray-800 shadow-lg">
      <div className="px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-4 sm:gap-6 w-full">
          {/* Left: Album Art and Track Info - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-3 sm:gap-4 flex-shrink-0 min-w-0 max-w-[200px] sm:max-w-[250px]">
            {currentTrack.thumbnailUrl && (
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={currentTrack.thumbnailUrl}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            )}
            <div className="flex flex-col min-w-0 flex-1">
              <h3 className="text-sm font-medium text-white truncate leading-tight">
                {currentTrack.title}
              </h3>
              {currentTrack.artist && (
                <span className="text-xs text-gray-400 truncate leading-tight">
                  {currentTrack.artist}
                </span>
              )}
            </div>
          </div>

          {/* Center: Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={togglePlay}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#0B0B0D] flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 flex-shrink-0"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1" fill="currentColor" />
              )}
            </button>
          </div>

          {/* Right: Progress Bar, Time, and Volume */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            {/* Progress Bar and Time */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div
                ref={sliderRef}
                onMouseDown={handleProgressMouseDown}
                onTouchStart={(e) => {
                  // Handle touch for mobile
                  const touch = e.touches[0]
                  const target = e.currentTarget
                  const rect = target.getBoundingClientRect()
                  const x = touch.clientX - rect.left
                  const clickRatio = Math.max(0, Math.min(1, x / rect.width))
                  const newTime = clickRatio * duration
                  if (duration > 0 && Number.isFinite(duration)) {
                    setIsDragging(true)
                    setDragTime(newTime)
                    seek(newTime)
                  }
                }}
                className="relative flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group min-w-0 select-none touch-none"
                role="slider"
                tabIndex={0}
                aria-label="Progress"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={displayTime}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') {
                    seek(Math.max(0, displayTime - 5))
                  } else if (e.key === 'ArrowRight') {
                    seek(Math.min(duration, displayTime + 5))
                  }
                }}
              >
                <div
                  className="absolute left-0 top-0 h-full bg-[#6869DE] rounded-full transition-all pointer-events-none"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="text-[10px] sm:text-xs text-white tabular-nums whitespace-nowrap flex-shrink-0">
                {formatTime(Math.max(0, displayTime))} / {formatTime(Math.max(0, duration))}
              </div>
            </div>

            {/* Volume Control - Mute/Unmute Button - Hidden on mobile */}
            <div className="hidden sm:flex items-center flex-shrink-0">
              <button
                onClick={toggleMute}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element will be managed by the context */}
    </div>
  )
}

