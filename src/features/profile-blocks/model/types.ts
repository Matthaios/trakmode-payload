/**
 * Type definitions for profile content blocks
 * These types match the block structure defined in payload/collections/Users
 * and match Payload's generated types
 */

/**
 * Type definitions for profile content blocks
 * These types match the block structure defined in payload/collections/Users
 * and match Payload's generated types
 */

export interface YouTubeVideoBlock {
  title?: string
  videos?: Array<{
    video?: string
    id?: string
  }>
  collapseCount?: number
  id?: string
  blockName?: string
  blockType: 'youtube-video-block'
}

export interface AudioPlayerBlock {
  title?: string
  collapseCount?: number
  audioFiles?: Array<{
    trackTitle: string
    subtitle?: string
    audioFile?: string | { url: string } | { id: string; url?: string }
    thumbnail?: string | { url: string } | { id: string; url?: string }
    id?: string
  }>
  id?: string
  blockName?: string
  blockType: 'audio-player-block'
}

/**
 * Union type for all profile block types
 * Add new block types here as they are created
 */
export type ProfileBlock = YouTubeVideoBlock | AudioPlayerBlock

/**
 * Helper type to extract block type from ProfileBlock union
 */
export type BlockType = ProfileBlock['blockType']
