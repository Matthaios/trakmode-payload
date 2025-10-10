'use client'

import type { Media } from '@/payload-types'
import NextImage from 'next/image'
import type { ImageProps as NextImageProps } from 'next/image'
interface ImageProps {
  image: Media
}

export const Image = ({ image, alt, ...rest }: ImageProps & NextImageProps) => {
  const { src, ...imageProps } = rest
  return <NextImage src={image.url} alt={alt || ''} sizes="100vw" {...imageProps} />
}
