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

# Feature: Platform Embed Widgets (Spotify, Apple Music, SoundCloud, Bandcamp)

## Overview
Create content blocks that allow users to embed widgets from major music platforms including Spotify, Apple Music, SoundCloud, and Bandcamp.

## User Story
As a music creator, I want to embed my music from Spotify, Apple Music, SoundCloud, and Bandcamp on my profile so that visitors can discover and stream my music on their preferred platforms.

## Acceptance Criteria
- [ ] Users can embed Spotify tracks, albums, and playlists
- [ ] Users can embed Apple Music content
- [ ] Users can embed SoundCloud tracks and playlists
- [ ] Users can embed Bandcamp albums and tracks
- [ ] Platform widgets are responsive and mobile-friendly
- [ ] Automatic content validation and error handling
- [ ] Support for custom titles and descriptions
- [ ] Platform-specific styling and branding

## Technical Design
### Architecture
- Platform-specific embed URL parsing
- iframe-based widget rendering
- Platform API integration where available
- Responsive widget handling

### Database Changes
- [ ] Add PlatformEmbedBlock component to block registry
- [ ] Configure platform selection field
- [ ] Add platform-specific URL fields
- [ ] Add embed configuration options

### Frontend Components
- [ ] PlatformEmbedBlock component for admin and public
- [ ] SpotifyEmbed component
- [ ] AppleMusicEmbed component
- [ ] SoundCloudEmbed component
- [ ] BandcampEmbed component
- [ ] PlatformURLInput component

## Implementation Plan
1. [ ] Create PlatformEmbedBlock component and schema
2. [ ] Implement Spotify embed integration
3. [ ] Add Apple Music embed support
4. [ ] Implement SoundCloud embed integration
5. [ ] Add Bandcamp embed support
6. [ ] Create unified admin interface

## Dependencies
- Depends on: Block Builder Architecture
- Blocks: None (completes content blocks system)

## Files to Create/Modify
### New Files
- `src/services/payload/components/PlatformEmbedBlock.tsx`
- `src/components/admin/PlatformURLInput.tsx`
- `src/components/profile/blocks/PlatformEmbedBlock.tsx`
- `src/components/profile/embeds/SpotifyEmbed.tsx`
- `src/components/profile/embeds/AppleMusicEmbed.tsx`
- `src/components/profile/embeds/SoundCloudEmbed.tsx`
- `src/components/profile/embeds/BandcampEmbed.tsx`
- `src/lib/platform-utils.ts`

### Modified Files
- `src/services/payload/collections/Profiles.ts`
- `src/lib/block-registry.ts`

## Testing Strategy
- [ ] Unit tests for platform URL parsing
- [ ] Component tests for each platform embed
- [ ] Integration tests for platform APIs
- [ ] E2E tests for embed management
- [ ] Manual testing for cross-platform compatibility

## Performance Considerations
- Lazy loading for platform embeds
- Efficient iframe rendering
- Minimal impact on page load times
- Platform widget optimization

## Security Considerations
- Platform URL validation and sanitization
- iframe security attributes
- XSS prevention in embed content
- Platform-specific security requirements

## Notes
Platform integration is essential for music discovery. Focus on seamless embedding and maintaining platform branding. Ensure all widgets work consistently across devices.

## Progress Log
- 2024-12-19: Task created and planned
