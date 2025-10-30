'use client'

import { GlobalAudioPlayerProvider as Provider } from '../model/useGlobalAudioPlayer'
import { GlobalAudioPlayer } from './GlobalAudioPlayer'

export function GlobalAudioPlayerProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
      <GlobalAudioPlayer />
    </Provider>
  )
}

