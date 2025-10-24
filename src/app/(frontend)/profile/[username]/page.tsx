import { LivePreviewListener } from '@/components/LivePreviewListener'
import { AvatarProfilePhoto } from '@/components/untitled/base/avatar/avatar-profile-photo'
import { Button } from '@/components/untitled/base/buttons/button'
import { Instagram, X, YouTube, Layers } from '@/components/untitled/foundations/social-icons'
import { payloadClient } from '@/services/payload/client'
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

  const navSections = [
    'Tour',
    'Music',
    'Featured Videos',
    'Listen',
    'Merch',
    'Follow',
    'Find Out More',
    'Services',
    'Tutorials',
    'About',
  ]

  return (
    <div>
      {draft && <LivePreviewListener />}

      {/* Header Section */}
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
                {user.tagline && (
                  <p className="text-md text-balance text-tertiary">{user.tagline}</p>
                )}
              </div>

              {/* Social Media Links */}
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-tertiary" />
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <X className="w-4 h-4 text-tertiary" />
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <YouTube className="w-4 h-4 text-tertiary" />
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <Layers className="w-4 h-4 text-tertiary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="sticky top-0 z-10 bg-primary border-b border-secondary">
        <div className="max-w-4xl mx-auto px-3 md:px-8">
          <nav className="flex gap-6 overflow-x-auto py-4">
            {navSections.map((section) => (
              <button
                key={section}
                className="whitespace-nowrap text-sm font-medium text-tertiary hover:text-primary transition-colors"
              >
                {section}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-3 md:px-8 py-8 space-y-12">
        {/* Tour Section */}
        <section id="tour" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Tour</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="border border-secondary rounded-lg p-6">
              <div className="w-full h-32 bg-secondary rounded mb-4 flex items-center justify-center">
                <span className="text-tertiary">Event Image</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Upcoming Show</h3>
              <p className="text-sm text-tertiary mb-2">Date • Venue • Location</p>
              <div className="flex gap-2">
                <Button size="sm" color="primary">
                  RSVP
                </Button>
                <Button size="sm" color="secondary">
                  Get Tickets
                </Button>
              </div>
            </div>
            <div className="border border-secondary rounded-lg p-6">
              <div className="w-full h-32 bg-secondary rounded mb-4 flex items-center justify-center">
                <span className="text-tertiary">Event Image</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Past Performance</h3>
              <p className="text-sm text-tertiary mb-2">Date • Venue • Location</p>
              <Button size="sm" color="secondary">
                View Photos
              </Button>
            </div>
          </div>
        </section>

        {/* Music Section */}
        <section id="music" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Music</h2>
          <div className="border border-secondary rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-secondary rounded flex items-center justify-center">
                <span className="text-tertiary text-xs">Album Art</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary">Featured Track</h3>
                <p className="text-sm text-tertiary">Album • Release Date • Genre</p>
              </div>
              <Button size="sm" color="primary">
                Play
              </Button>
            </div>
            <div className="h-2 bg-secondary rounded-full">
              <div className="w-1/3 h-full bg-primary rounded-full"></div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-secondary rounded-lg p-4">
                <div className="w-full h-32 bg-secondary rounded mb-3 flex items-center justify-center">
                  <span className="text-tertiary text-xs">Track {i}</span>
                </div>
                <h4 className="font-medium text-primary mb-1">Track Title {i}</h4>
                <p className="text-xs text-tertiary">Genre • Duration</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Videos Section */}
        <section id="videos" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Featured Videos</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-secondary rounded-lg overflow-hidden">
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <span className="text-tertiary">DJ Set Video</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary mb-2">Live DJ Set</h3>
                <p className="text-sm text-tertiary">Event • Date • Duration</p>
              </div>
            </div>
            <div className="border border-secondary rounded-lg overflow-hidden">
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <span className="text-tertiary">Music Video</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary mb-2">Official Music Video</h3>
                <p className="text-sm text-tertiary">Track • Director • Year</p>
              </div>
            </div>
          </div>
        </section>

        {/* Listen Section */}
        <section id="listen" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Listen</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-secondary rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">Podcast Appearance</h3>
              <p className="text-sm text-tertiary mb-3">Podcast Name • Episode Title</p>
              <Button size="sm" color="secondary">
                Listen Now
              </Button>
            </div>
            <div className="border border-secondary rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">Radio Mix</h3>
              <p className="text-sm text-tertiary mb-3">Radio Station • Show Name</p>
              <Button size="sm" color="secondary">
                Listen Now
              </Button>
            </div>
          </div>
        </section>

        {/* Merch Section */}
        <section id="merch" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Merch</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[0, 2, 12, 30].map((price, i) => (
              <div key={i} className="border border-secondary rounded-lg p-4">
                <div className="w-full h-32 bg-secondary rounded mb-3 flex items-center justify-center">
                  <span className="text-tertiary text-xs">Product Image</span>
                </div>
                <h4 className="font-medium text-primary mb-1">Product {i + 1}</h4>
                <p className="text-sm font-semibold text-primary">€{price}.00</p>
              </div>
            ))}
          </div>
        </section>

        {/* Follow Section */}
        <section id="follow" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Follow</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Spotify', icon: '🎵' },
              { name: 'Apple Music', icon: '🍎' },
              { name: 'SoundCloud', icon: '☁️' },
              { name: 'Bandcamp', icon: '🎸' },
            ].map((platform) => (
              <Button
                key={platform.name}
                size="sm"
                color="tertiary"
                className="w-full p-4 border border-secondary rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <span className="font-medium">{platform.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </section>

        {/* Services Section (TrakMode-specific) */}
        <section id="services" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Services</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {['Production', 'Mixing & Mastering', 'Sound Design'].map((service) => (
              <div key={service} className="border border-secondary rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-3">{service}</h3>
                <p className="text-sm text-tertiary mb-4">
                  Professional {service.toLowerCase()} services for your audio projects.
                </p>
                <Button size="sm" color="primary">
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Tutorials Section (TrakMode-specific) */}
        <section id="tutorials" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Tutorials</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-secondary rounded-lg p-4">
                <div className="w-full h-32 bg-secondary rounded mb-3 flex items-center justify-center">
                  <span className="text-tertiary text-xs">Tutorial {i}</span>
                </div>
                <h4 className="font-medium text-primary mb-2">Tutorial Title {i}</h4>
                <p className="text-sm text-tertiary mb-3">
                  Learn advanced techniques for music production.
                </p>
                <Button size="sm" color="secondary">
                  Watch Now
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">About</h2>
          <div className="border border-secondary rounded-lg p-6">
            <div className="prose prose-sm max-w-none text-primary">
              <p>
                Professional audio creator specializing in electronic music production. With years
                of experience in the industry, I create immersive soundscapes that push the
                boundaries of modern music.
              </p>
              <p>
                My journey began with a passion for sound design and has evolved into a career
                dedicated to helping other creators achieve their vision.
              </p>
            </div>
          </div>
        </section>

        {/* Find Out More Section */}
        <section id="find-out-more" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Find Out More</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-secondary rounded-lg p-6">
              <h3 className="font-semibold text-primary mb-3">Contact</h3>
              <p className="text-sm text-tertiary mb-4">
                Interested in working together? Send me a message.
              </p>
              <Button size="sm" color="primary">
                Get In Touch
              </Button>
            </div>
            <div className="border border-secondary rounded-lg p-6">
              <h3 className="font-semibold text-primary mb-3">Press Kit</h3>
              <p className="text-sm text-tertiary mb-4">Download photos, bio, and media assets.</p>
              <Button size="sm" color="secondary">
                Download
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
