import type { ProfileBlock } from '../model/types'
import { YouTubeBlock } from './blocks/YouTubeBlock'

interface BlockRendererProps {
  block: ProfileBlock
}

/**
 * Block registry mapping block types to their renderer components
 * Add new block types here as they are implemented
 */
const blockRenderers = {
  'youtube-videos': YouTubeBlock,
} as const

/**
 * Main block renderer component
 * Maps block types to their corresponding renderer components
 */
export function BlockRenderer({ block }: BlockRendererProps) {
  const BlockComponent = blockRenderers[block.blockType]

  if (!BlockComponent) {
    // Silently skip unknown block types in production
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Unknown block type: ${block.blockType}`)
    }
    return null
  }

  return <BlockComponent block={block} />
}

/**
 * Renders an array of blocks
 */
export function BlocksRenderer({ blocks }: { blocks: ProfileBlock[] }) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </>
  )
}

