import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getUserProfile } from '@/entities/user/api/getUserProfile'
import { ProfileHeader } from '@/features/user-profile/ui/ProfileHeader'
import { BlocksRenderer } from '@/features/profile-blocks/ui/BlockRenderer'
import { LinksSection } from '@/widgets/ProfileSections/ui/LinksSection'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import type { ProfileBlock } from '@/features/profile-blocks/model/types'

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const { isEnabled: draft } = await draftMode()

  const user = await unstable_cache(getUserProfile, [`user:profile:${username}`], {
    tags: [`user:profile:${username}`],
  })(username)

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">User not found</h1>
          <p className="text-gray-600 mt-2">The user &quot;{username}&quot; could not be found.</p>
        </div>
      </div>
    )
  }

  // Extract blocks from profile.content, filtering out invalid blocks
  const blocks: ProfileBlock[] =
    (user.profile?.content?.filter((block): block is ProfileBlock => {
      return block !== null && typeof block === 'object' && 'blockType' in block
    }) as ProfileBlock[]) || []

  return (
    <div>
      {draft && <LivePreviewListener />}

      <ProfileHeader user={user} username={username} />

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-3 md:px-8 py-8 space-y-12">
        <BlocksRenderer blocks={blocks} />
        <LinksSection user={user} />
      </div>
    </div>
  )
}
