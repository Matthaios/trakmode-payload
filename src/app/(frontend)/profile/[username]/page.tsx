import RichText from '@/components/elements/RichText'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { AvatarProfilePhoto } from '@/components/untitled/base/avatar/avatar-profile-photo'
import { Button } from '@/components/untitled/base/buttons/button'
import { payloadClient } from '@/services/payload/client'
import { ArrowLeft } from '@untitledui/icons'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'

async function loadProfile(username: string) {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    depth: 1,
    limit: 1,

    pagination: false,
    overrideAccess: true,
    where: {
      username: { equals: username },
    },
  })

  return docs?.[0] || null
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const { isEnabled: draft } = await draftMode()

  const user = await unstable_cache(loadProfile, [`user:profile:${username}`], {
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

  return (
    <div>
      {draft && <LivePreviewListener />}

      <div className="relative flex flex-col items-center bg-primary px-1 pt-1">
        {/* Cover Image */}
        <div
          className="h-40 w-full relative rounded-xl bg-gradient-to-t from-[#FBC5EC] to-[#A5C0EE] lg:h-60"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${user.cover?.url as string})`,
          }}
        />

        <div className="relative -mt-12 w-full max-w-6xl px-3 md:-mt-16 md:px-8">
          {/* Profile Section */}
          <div className="relative flex flex-col items-center gap-4 border-b border-secondary pb-4 md:gap-5 md:pb-5">
            {/* Avatar - Mobile */}
            <AvatarProfilePhoto
              className="lg:hidden"
              size="md"
              src={
                user.avatar && typeof user.avatar === 'object' && 'url' in user.avatar
                  ? user.avatar.url
                  : 'https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80'
              }
              alt={user.name || username}
            />

            {/* Avatar - Desktop */}
            <AvatarProfilePhoto
              className="max-lg:hidden"
              size="lg"
              src={
                user.avatar && typeof user.avatar === 'object' && 'url' in user.avatar
                  ? user.avatar.sizes?.thumbnail?.url
                  : (user?.avatar?.url as string)
              }
              alt={user.name || username}
            />

            <div className="flex w-full flex-col items-center gap-4 md:gap-5">
              {/* User Info */}
              <div className="flex flex-col items-center gap-0.5 lg:gap-1">
                <h1 className="text-xl font-semibold text-primary md:text-display-xs">
                  {user.name || username}
                </h1>
                <p className="text-md text-balance text-tertiary">@{username}</p>
                {user.tagline && (
                  <p className="text-md text-balance text-tertiary">{user.tagline}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
