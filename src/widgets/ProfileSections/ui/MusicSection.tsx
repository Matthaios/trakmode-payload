import { Button } from '@/shared/ui/base/buttons/button'

export function MusicSection() {
  return (
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
  )
}
