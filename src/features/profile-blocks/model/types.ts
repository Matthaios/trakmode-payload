/**
 * Type definitions for profile content blocks
 * These types match the block structure defined in payload/collections/Users
 * and match Payload's generated types
 */

export interface YouTubeVideoBlock {
  blockType: 'youtube-videos'
  videos?: Array<{
    video?: string | null
    id?: string | null
  }> | null
  id?: string | null
  blockName?: string | null
}

/**
 * Union type for all profile block types
 * Add new block types here as they are created
 */
export type ProfileBlock = YouTubeVideoBlock

/**
 * Helper type to extract block type from ProfileBlock union
 */
export type BlockType = ProfileBlock['blockType']

