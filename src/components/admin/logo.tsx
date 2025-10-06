/* eslint-disable @next/next/no-img-element */
'use client'

import { useTheme } from '@payloadcms/ui'

export const Logo = () => {
  const { theme } = useTheme()

  return (
    <img src={theme === 'light' ? '/trakmode-dark.png' : '/trakmode-light.png'} alt="Trakmode" />
  )
}
