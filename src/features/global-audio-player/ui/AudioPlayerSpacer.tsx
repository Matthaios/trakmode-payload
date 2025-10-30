'use client'

import { useGlobalAudioPlayer } from '../model/useGlobalAudioPlayer'

/**
 * Adds bottom padding to prevent content from being hidden by the fixed audio player
 */
export function AudioPlayerSpacer() {
  const { isVisible } = useGlobalAudioPlayer()

  if (!isVisible) {
    return null
  }

  // Add padding that matches the player height
  // Mobile: ~70px, Desktop: ~90px
  return <div className="h-[70px] sm:h-[90px] flex-shrink-0" aria-hidden="true" />
}

