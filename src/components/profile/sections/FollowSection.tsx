import { Button } from '@/components/ui/base/buttons/button'

export function FollowSection() {
  return (
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
  )
}
