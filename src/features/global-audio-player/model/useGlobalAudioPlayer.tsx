'use client'

import React, { createContext, useContext, useRef, useState, useCallback, useEffect, useMemo } from 'react'

export interface AudioTrack {
  id: string
  title: string
  artist?: string
  audioUrl: string
  thumbnailUrl?: string
}

interface GlobalAudioPlayerContextValue {
  currentTrack: AudioTrack | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isVisible: boolean
  isMuted: boolean
  play: (track: AudioTrack) => void
  pause: () => void
  resume: () => void
  togglePlay: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  previousTrack: () => void
  nextTrack: () => void
}

const GlobalAudioPlayerContext = createContext<GlobalAudioPlayerContextValue | null>(null)

export function useGlobalAudioPlayer() {
  const context = useContext(GlobalAudioPlayerContext)
  if (!context) {
    throw new Error('useGlobalAudioPlayer must be used within GlobalAudioPlayerProvider')
  }
  return context
}

export function GlobalAudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.75) // Default to 75% volume
  const [isVisible, setIsVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const previousVolumeRef = useRef<number>(0.75) // Store volume before muting
  const trackQueueRef = useRef<AudioTrack[]>([])

  // Set up event listeners for audio element
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      if (audio) {
        const time = audio.currentTime
        if (!Number.isNaN(time) && Number.isFinite(time)) {
          setCurrentTime(time)
        }
      }
    }

    const handleLoadedMetadata = () => {
      if (audio) {
        const dur = audio.duration
        if (!Number.isNaN(dur) && Number.isFinite(dur) && dur > 0) {
          setDuration(dur)
        }
      }
    }

    const handleLoadedData = () => {
      if (audio) {
        const dur = audio.duration
        if (!Number.isNaN(dur) && Number.isFinite(dur) && dur > 0) {
          setDuration(dur)
        }
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    // Add multiple events to catch duration
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('durationchange', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    // Use interval as fallback for time updates
    const interval = setInterval(() => {
      if (audio && !audio.paused) {
        const time = audio.currentTime
        if (!Number.isNaN(time) && Number.isFinite(time)) {
          setCurrentTime(time)
        }
        const dur = audio.duration
        if (!Number.isNaN(dur) && Number.isFinite(dur) && dur > 0) {
          setDuration(dur)
        }
      }
    }, 100)

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('loadeddata', handleLoadedData)
        audio.removeEventListener('durationchange', handleLoadedMetadata)
        audio.removeEventListener('ended', handleEnded)
      }
      clearInterval(interval)
    }
  }, [currentTrack?.id]) // Re-run when track changes

  // Update volume on audio element
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0
      } else {
        audioRef.current.volume = volume
      }
    }
  }, [volume, isMuted])

  // Initialize audio element on mount
  useEffect(() => {
    if (!audioRef.current) {
      const audio = document.createElement('audio')
      audio.crossOrigin = 'anonymous'
      audio.preload = 'metadata'
      audio.style.display = 'none'
      document.body.appendChild(audio)
      audioRef.current = audio
    }

    return () => {
      // Only pause on unmount, don't remove the element as it may still be playing
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const play = useCallback((track: AudioTrack) => {
    if (!audioRef.current) return

    const audio = audioRef.current

    // If same track, just resume if paused
    if (currentTrack?.id === track.id) {
      if (audio.paused) {
        audio.play().catch(console.error)
        setIsPlaying(true)
      }
      return
    }

    // Load new track
    setCurrentTrack(track)
    setIsVisible(true)
    audio.src = track.audioUrl
    audio.load()
    audio.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch((error) => {
        console.error('Error playing audio:', error)
        setIsPlaying(false)
      })
  }, [currentTrack])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const resume = useCallback(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.play().catch(console.error)
      setIsPlaying(true)
    }
  }, [currentTrack])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      resume()
    }
  }, [isPlaying, pause, resume])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolumeState(clampedVolume)
    previousVolumeRef.current = clampedVolume
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = clampedVolume
    }
  }, [isMuted])

  const toggleMute = useCallback(() => {
    if (isMuted) {
      // Unmute - restore previous volume
      setIsMuted(false)
      if (audioRef.current) {
        audioRef.current.volume = previousVolumeRef.current
      }
    } else {
      // Mute - save current volume and set to 0
      if (audioRef.current) {
        previousVolumeRef.current = audioRef.current.volume
        audioRef.current.volume = 0
      }
      setIsMuted(true)
    }
  }, [isMuted])

  const previousTrack = useCallback(() => {
    // For now, just restart current track
    // Can be enhanced later to support actual track queue
    if (audioRef.current && currentTrack) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }, [currentTrack])

  const nextTrack = useCallback(() => {
    // For now, just pause
    // Can be enhanced later to support actual track queue
    pause()
  }, [pause])

  const value = useMemo<GlobalAudioPlayerContextValue>(
    () => ({
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      isVisible,
      isMuted,
      play,
      pause,
      resume,
      togglePlay,
      seek,
      setVolume,
      toggleMute,
      previousTrack,
      nextTrack,
    }),
    [currentTrack, isPlaying, currentTime, duration, volume, isVisible, isMuted, play, pause, resume, togglePlay, seek, setVolume, toggleMute, previousTrack, nextTrack]
  )

  return (
    <GlobalAudioPlayerContext.Provider value={value}>
      {children}
    </GlobalAudioPlayerContext.Provider>
  )
}

