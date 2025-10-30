/**
 * Type definitions for profile content blocks
 * These types match the block structure defined in payload/collections/Users
 * and match Payload's generated types
 */

import type { YouTubeVideoBlock } from '@/blocks/youtube-video-block/youtube-video-block.config'

/**
 * Union type for all profile block types
 * Add new block types here as they are created
 */
export type ProfileBlock = YouTubeVideoBlock

/**
 * Helper type to extract block type from ProfileBlock union
 */
export type BlockType = ProfileBlock['blockType']
