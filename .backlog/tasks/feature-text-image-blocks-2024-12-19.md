---
status: 🔵 Ready
priority: 🟠 High
category: Feature
assigned:
created: 2024-12-19
updated: 2024-12-19
estimated-hours: 16
actual-hours: 0
sprint:
epic: Content Blocks System
---

# Feature: Text and Image Content Blocks

## Overview
Create the foundational content blocks for text and images that users can add to their profile pages. These are the most basic and essential content types.

## User Story
As a music creator, I want to add text blocks to write about myself and my music, and image blocks to showcase photos, album art, or other visuals so that I can tell my story and create visual interest on my profile.

## Acceptance Criteria
- [ ] Users can add text blocks with rich text editing
- [ ] Users can add image blocks with upload and URL options
- [ ] Text blocks support basic formatting (bold, italic, links, lists)
- [ ] Image blocks support captions and alt text
- [ ] Images are optimized and responsive
- [ ] Text blocks have proper typography and spacing
- [ ] Both blocks render correctly on all devices
- [ ] Admin interface is intuitive for content editing

## Technical Design
### Architecture
- Text block with rich text editor (Lexical or similar)
- Image block with upload and URL input options
- Image optimization and responsive handling
- Block-specific admin interfaces

### Database Changes
- [ ] Add TextBlock component to block registry
- [ ] Add ImageBlock component to block registry
- [ ] Configure rich text field for text blocks
- [ ] Configure image upload fields for image blocks

### Frontend Components
- [ ] TextBlock component for admin and public
- [ ] ImageBlock component for admin and public
- [ ] RichTextEditor component
- [ ] ImageUpload component with preview
- [ ] ImageCaption component

## Implementation Plan
1. [ ] Create TextBlock component and schema
2. [ ] Create ImageBlock component and schema
3. [ ] Implement rich text editor
4. [ ] Add image upload and optimization
5. [ ] Create admin interfaces for both blocks
6. [ ] Add responsive styling and typography

## Dependencies
- Depends on: Block Builder Architecture
- Blocks: YouTube video block, Audio player block

## Files to Create/Modify
### New Files
- `src/services/payload/components/TextBlock.tsx`
- `src/services/payload/components/ImageBlock.tsx`
- `src/components/admin/RichTextEditor.tsx`
- `src/components/admin/ImageUpload.tsx`
- `src/components/profile/blocks/TextBlock.tsx`
- `src/components/profile/blocks/ImageBlock.tsx`

### Modified Files
- `src/services/payload/collections/Profiles.ts`
- `src/lib/block-registry.ts`

## Testing Strategy
- [ ] Unit tests for text and image block components
- [ ] Component tests for rich text editor
- [ ] Integration tests for image upload
- [ ] E2E tests for content editing flow
- [ ] Visual regression tests for block rendering

## Performance Considerations
- Image optimization and lazy loading
- Rich text editor performance
- Efficient re-rendering of content blocks
- Proper image sizing for different viewports

## Security Considerations
- Rich text content sanitization
- Image upload validation and security
- XSS prevention in text content
- File type and size restrictions for images

## Notes
These are the most basic content blocks and should be rock solid. Focus on user experience for content creation and visual quality for content display.

## Progress Log
- 2024-12-19: Task created and planned
