import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getUserProfile } from '@/entities/user/api/getUserProfile'
import { ProfileHeader } from '@/features/user-profile/ui/ProfileHeader'
import { ProfileNav } from '@/features/user-profile/ui/ProfileNav'
import { TourSection } from '@/widgets/ProfileSections/ui/TourSection'
import { MusicSection } from '@/widgets/ProfileSections/ui/MusicSection'
import { FeaturedVideosSection } from '@/widgets/ProfileSections/ui/FeaturedVideosSection'
import { ListenSection } from '@/widgets/ProfileSections/ui/ListenSection'
import { MerchSection } from '@/widgets/ProfileSections/ui/MerchSection'
import { FollowSection } from '@/widgets/ProfileSections/ui/FollowSection'
import { ServicesSection } from '@/widgets/ProfileSections/ui/ServicesSection'
import { TutorialsSection } from '@/widgets/ProfileSections/ui/TutorialsSection'
import { AboutSection } from '@/widgets/ProfileSections/ui/AboutSection'
import { FindOutMoreSection } from '@/widgets/ProfileSections/ui/FindOutMoreSection'
import { LinksSection } from '@/widgets/ProfileSections/ui/LinksSection'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'

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

  const navSections = [
    'Tour',
    'Music',
    'Featured Videos',
    'Listen',
    'Merch',
    'Follow',
    'Links',
    'Find Out More',
    'Services',
    'Tutorials',
    'About',
  ]

  return (
    <div>
      {draft && <LivePreviewListener />}

      <ProfileHeader user={user} username={username} />
      <ProfileNav sections={navSections} />

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-3 md:px-8 py-8 space-y-12">
        <TourSection />
        <MusicSection />
        <FeaturedVideosSection />
        <ListenSection />
        <MerchSection />
        <FollowSection />
        <LinksSection user={user} />
        <ServicesSection />
        <TutorialsSection />
        <AboutSection />
        <FindOutMoreSection />
      </div>
    </div>
  )
}
