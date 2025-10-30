# Creating Profile Blocks - Cursor Rule

This guide outlines the step-by-step process for creating new profile blocks in the Trakmode application.

## Overview

Profile blocks are modular components that allow users to add different types of content to their profiles. Each block consists of three main parts:
- **Website Component**: How the block renders on the public profile page
- **CMS Configuration**: How the block is configured in Payload CMS
- **Type Definitions**: TypeScript interfaces for type safety

## Directory Structure

All profile blocks live under `src/features/profile-blocks/`:

```
src/features/profile-blocks/
├── model/types.ts                    # All block type definitions
├── ui/
│   ├── BlockRenderer.tsx             # Main renderer with registry
│   └── blocks/
│       └── BlockName/                # Each block gets its own folder
│           ├── index.ts              # Exports both components
│           ├── BlockName.tsx         # Website rendering component
│           └── BlockName.cms.tsx     # Optional admin preview component
└── cms/
    └── blocks/
        └── BlockName/                # CMS-specific files
            └── config.ts             # Payload block configuration
```

## Step-by-Step Guide

### 1. Define Block Types

Add your block interface to `src/features/profile-blocks/model/types.ts`:

```typescript
export interface BlockNameBlock {
  blockType: 'block-slug'
  // Add your block-specific fields here
  title?: string | null
  content?: string | null
  // ... other fields
  id?: string | null
  blockName?: string | null
}

// Add to the union type
export type ProfileBlock = YouTubeVideoBlock | BlockNameBlock | // ... other blocks
```

### 2. Create Block Directory Structure

Create the block folder: `src/features/profile-blocks/ui/blocks/BlockName/`

### 3. Create Website Component

Create `src/features/profile-blocks/ui/blocks/BlockName/BlockName.tsx`:

```typescript
'use client'

import type { BlockNameBlock } from '@/features/profile-blocks/model/types'

interface BlockNameProps {
  block: BlockNameBlock
}

export function BlockName({ block }: BlockNameProps) {
  // Your rendering logic here
  return (
    <section id="block-slug" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">
        {block.title || 'Block Title'}
      </h2>
      {/* Your block content */}
    </section>
  )
}
```

### 4. Create Block Index

Create `src/features/profile-blocks/ui/blocks/BlockName/index.ts`:

```typescript
export { BlockName as default } from './BlockName'
export { BlockName } from './BlockName'
// Export admin component if it exists
// export { BlockNameAdmin } from './BlockName.cms'
```

### 5. Register Block in Renderer

Update `src/features/profile-blocks/ui/BlockRenderer.tsx`:

```typescript
import BlockName from './blocks/BlockName'

const blockRenderers = {
  'youtube-videos': YouTubeBlock,
  'block-slug': BlockName,
  // ... other blocks
} as const
```

### 6. Create CMS Configuration

Create `src/features/profile-blocks/cms/blocks/BlockName/config.ts`:

```typescript
import type { Block } from 'payload'

export const BlockNameBlock: Block = {
  slug: 'block-slug',
  labels: {
    singular: 'Block Name',
    plural: 'Block Names',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // Add your block-specific fields here
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
```

### 7. Export CMS Config

Create/update `src/features/profile-blocks/cms/blocks/index.ts`:

```typescript
export { YouTubeBlogBlock } from './YouTubeBlog/config'
export { BlockNameBlock } from './BlockName/config'
// ... export other block configs
```

### 8. Add to Payload Collection

Update `src/payload/collections/Users/index.ts`:

```typescript
import { YouTubeBlogBlock, BlockNameBlock } from '@/features/profile-blocks/cms/blocks'

blocks: [
  YouTubeBlogBlock,
  BlockNameBlock,
  // ... other blocks
],
```

## Optional: Admin Preview Component

If you need a custom admin preview, create `BlockName.cms.tsx`:

```typescript
'use client'

import type { BlockNameBlock } from '@/features/profile-blocks/model/types'

interface BlockNameAdminProps {
  block: BlockNameBlock
}

export function BlockNameAdmin({ block }: BlockNameAdminProps) {
  return (
    <div className="admin-preview">
      <h3>{block.title}</h3>
      {/* Admin preview content */}
    </div>
  )
}
```

Then export it from the index.ts and use it in the Payload config.

## Best Practices

### Naming Conventions
- Use kebab-case for block slugs: `'spotify-playlist'`
- Use PascalCase for component names: `SpotifyPlaylist`
- Use camelCase for interface names: `SpotifyPlaylistBlock`

### Block Structure
- Always include `id` and `blockName` fields (Payload adds these automatically)
- Use `blockType` as the discriminator for union types
- Keep blocks self-contained - no dependencies between blocks

### Error Handling
- Handle missing or invalid data gracefully
- Use null checks and fallbacks
- Log warnings in development for debugging

### Styling
- Use Tailwind classes for consistent styling
- Follow the existing design patterns
- Keep styles scoped to the block component

### Type Safety
- Define all block fields in the TypeScript interface
- Match Payload field definitions exactly
- Use union types for optional fields: `string | null`

## Example: Creating a "Spotify Playlist" Block

Following the steps above:

1. **Types** (`types.ts`):
   ```typescript
   export interface SpotifyPlaylistBlock {
     blockType: 'spotify-playlist'
     title?: string | null
     playlistUrl?: string | null
     description?: string | null
     id?: string | null
     blockName?: string | null
   }
   ```

2. **Website Component** (`SpotifyPlaylist.tsx`):
   ```typescript
   export function SpotifyPlaylist({ block }: SpotifyPlaylistProps) {
     const playlistId = extractSpotifyId(block.playlistUrl)
     return (
       <section>
         <h2>{block.title}</h2>
         <iframe src={`https://open.spotify.com/embed/playlist/${playlistId}`} />
       </section>
     )
   }
   ```

3. **CMS Config** (`config.ts`):
   ```typescript
   export const SpotifyPlaylistBlock: Block = {
     slug: 'spotify-playlist',
     fields: [
       { name: 'title', type: 'text', required: true },
       { name: 'playlistUrl', type: 'text' },
       { name: 'description', type: 'textarea' },
     ],
   }
   ```

4. **Wire it up**: Add to renderer, export from index, add to Users collection.

## Testing

- Test the block renders correctly on profile pages
- Test the CMS configuration works in Payload admin
- Verify type safety with TypeScript
- Check responsive behavior on different screen sizes

## Common Patterns

### Arrays of Items
```typescript
{
  name: 'items',
  type: 'array',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'url', type: 'text' },
  ],
}
```

### Rich Text Content
```typescript
{
  name: 'content',
  type: 'richText',
}
```

### Media Uploads
```typescript
{
  name: 'image',
  type: 'upload',
  relationTo: 'media',
}
```

### Conditional Fields
```typescript
{
  name: 'hasDescription',
  type: 'checkbox',
},
{
  name: 'description',
  type: 'textarea',
  admin: {
    condition: (data) => data?.hasDescription,
  },
}
```

## Need Help?

- Check existing blocks for examples
- Look at Payload documentation for field types
- Refer to the architecture guidelines in the main README
- Ask in the team channel if you're unsure about any step
