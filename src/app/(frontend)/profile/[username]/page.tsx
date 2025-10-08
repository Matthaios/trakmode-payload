import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import payloadConfig from '@/payload.config'
import { ArrowLeft, SearchLg } from '@untitledui/icons'
import { AvatarProfilePhoto } from '@/components/untitled/base/avatar/avatar-profile-photo'
import { Button } from '@/components/untitled/base/buttons/button'
import { Input } from '@/components/untitled/base/input/input'
import RichText from '@/components/elements/RichText'

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'users',
    draft,
    limit: 1,

    select: {
      avatar: true,
      cover: true,
      bio: true,
      name: true,
      username: true,
    },
    pagination: false,
    overrideAccess: true,
    where: {
      username: { equals: username },
    },
  })
  const user = docs?.[0] || null

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
          className="h-40 w-full rounded-xl bg-gradient-to-t from-[#FBC5EC] to-[#A5C0EE] lg:h-60"
          style={{
            backgroundImage:
              user.cover && typeof user.cover === 'object' && 'url' in user.cover
                ? `url(${user.cover.url})`
                : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative -mt-12 w-full max-w-6xl px-3 md:-mt-16 md:px-8">
          {/* Back Button for Mobile */}
          <div className="absolute top-17 left-0 flex md:hidden">
            <Button href="/" color="link-gray" size="md" iconLeading={<ArrowLeft />}>
              Back
            </Button>
          </div>

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
                  ? user.avatar.url
                  : 'https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80'
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
                {user.bio && <RichText data={user.bio} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
