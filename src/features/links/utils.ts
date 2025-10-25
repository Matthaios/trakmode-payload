import type { Links } from './links'
import { Instagram, InstagramProps } from '@/shared/ui/foundations/social-icons'
import { X, XProps } from '@/shared/ui/foundations/social-icons'
import { YouTube, YouTubeProps } from '@/shared/ui/foundations/social-icons'
import { LinkedIn, LinkedInProps } from '@/shared/ui/foundations/social-icons'
import { TikTok, TikTokProps } from '@/shared/ui/foundations/social-icons'
import { Layers, LayersProps } from '@/shared/ui/foundations/social-icons'

export type LinkType = keyof NonNullable<Links>

export interface LinkConfig {
  label: string
  icon: React.ComponentType<any>
  placeholder: string
}

export const linkConfigs: Record<LinkType, LinkConfig> = {
  website: {
    label: 'Website',
    icon: Layers,
    placeholder: 'https://www.example.com',
  },
  twitter: {
    label: 'X (Twitter)',
    icon: X,
    placeholder: 'https://x.com/example',
  },
  instagram: {
    label: 'Instagram',
    icon: Instagram,
    placeholder: 'https://www.instagram.com/example',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: LinkedIn,
    placeholder: 'https://www.linkedin.com/in/example',
  },
  youtube: {
    label: 'YouTube',
    icon: YouTube,
    placeholder: 'https://www.youtube.com/example',
  },
  tiktok: {
    label: 'TikTok',
    icon: TikTok,
    placeholder: 'https://www.tiktok.com/@example',
  },
}

export function isValidUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== 'string') return false
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

export function getValidatedUrl(url: string | null | undefined): string | null {
  if (!isValidUrl(url)) return null
  return url
}

export function getAvailableLinks(links: Links | undefined): Array<{ type: LinkType; url: string; config: LinkConfig }> {
  if (!links) return []
  
  const availableLinks: Array<{ type: LinkType; url: string; config: LinkConfig }> = []
  
  for (const [linkType, url] of Object.entries(links)) {
    const validatedUrl = getValidatedUrl(url)
    if (validatedUrl && linkType in linkConfigs) {
      availableLinks.push({
        type: linkType as LinkType,
        url: validatedUrl,
        config: linkConfigs[linkType as LinkType],
      })
    }
  }
  
  return availableLinks
}
