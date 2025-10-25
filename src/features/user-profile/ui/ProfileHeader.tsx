import { AvatarProfilePhoto } from '@/shared/ui/base/avatar/avatar-profile-photo'
import { getAvailableLinks, linkConfigs } from '@/features/links/utils'
import type { UserProfile } from '@/entities/user/model/types'

interface ProfileHeaderProps {
  user: UserProfile
  username: string
}

export function ProfileHeader({ user, username }: ProfileHeaderProps) {
  const availableLinks = getAvailableLinks(user.links)

  return (
    <div className="relative flex flex-col items-center bg-primary px-1 pt-1">
      {/* Cover Image */}
      <div
        className="h-40 w-full relative rounded-xl bg-gradient-to-t from-[#FBC5EC] to-[#A5C0EE] lg:h-60"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${user.cover && typeof user.cover === 'object' && 'url' in user.cover ? user.cover.url : 'https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80'})`,
        }}
      />

      <div className="relative -mt-12 w-full max-w-4xl px-3 md:-mt-16 md:px-8">
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
                : user.avatar && typeof user.avatar === 'object' && 'url' in user.avatar
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
              {user.tagline && <p className="text-md text-balance text-tertiary">{user.tagline}</p>}
            </div>

            {/* Social Media Links */}
            {availableLinks.length > 0 && (
              <div className="flex gap-4">
                {availableLinks.map((link) => {
                  const Icon = link.config.icon
                  return (
                    <a
                      key={link.type}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-tertiary transition-colors"
                      aria-label={`${link.config.label} profile`}
                    >
                      <Icon className="w-4 h-4 text-tertiary hover:text-primary" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
